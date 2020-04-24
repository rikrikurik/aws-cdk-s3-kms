#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { KmsKeyStack } from '../lib/kms-key';
import { S3BucketStack } from '../lib/s3-bucket';
import { IAMRoleStack } from '../lib/iam-role'
import { S3DeploymentStack } from '../lib/s3-deployment';

const app = new cdk.App();

// Get Context
const name_prefix = app.node.tryGetContext("name")
const system_name = app.node.tryGetContext("system_name")
const system_env = app.node.tryGetContext("env")
const kms_key_name = `${name_prefix}-${system_name}-${system_env}-key`
const s3_bucket_name = `${name_prefix}-${system_name}-${system_env}-bucket`.toLowerCase()
const iam_stack_name = `${name_prefix}-${system_name}-${system_env}-roles`.toLowerCase()

// Define stack env
const stack_env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION
}

// Create stacks
const kms_stack = new KmsKeyStack(app, 'kmskey', kms_key_name,
  {
    stackName: kms_key_name,
    env: stack_env
  });
const s3_stack = new S3BucketStack(app, 's3bucket', s3_bucket_name,
kms_stack.key,
  {
    stackName: s3_bucket_name,
    env: stack_env
  })
const role_stack = new IAMRoleStack(app, 'iamrole',
  `${name_prefix}-${system_name}-${system_env}`,
  {
    stackName: iam_stack_name,
    env: stack_env
  })

// Define stack dependencies
s3_stack.addDependency(kms_stack, 'Using encryption key')
role_stack.addDependency(kms_stack, 'Using encryption key for s3bucket')

// attach policy to iam roles
role_stack.attachPolicy(kms_stack.key, s3_stack.bucket)

// Tagging
cdk.Tag.add(kms_stack, "system", system_name)
cdk.Tag.add(kms_stack, "env", system_env)
cdk.Tag.add(s3_stack, "system", system_name)
cdk.Tag.add(s3_stack, "env", system_env)
cdk.Tag.add(role_stack, "system", system_name)
cdk.Tag.add(role_stack, "env", system_env)

// Add s3deployment
// const s3_deployment = new S3DeploymentStack(app, 's3deployment',
//   s3_bucket_name, kms_key_stack.key,
//   {
//     stackName: s3_bucket_name + '-deploy',
//     env: stack_env
//   })
// s3_deployment.addDependency(kms_stack, 'Deploy contents into s3 bucket')

// cdk.Tag.add(s3_deployment, "system", system_name)
// cdk.Tag.add(s3_deployment, "env", system_env)
