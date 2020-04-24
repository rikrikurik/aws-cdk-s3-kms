#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { KmsKeyStack } from '../lib/kms-key';
import { S3BucketStack } from '../lib/s3-bucket';

const app = new cdk.App();

// Get Context
const name_prefix = app.node.tryGetContext("name")
const system_name = app.node.tryGetContext("system_name")
const system_env = app.node.tryGetContext("env")
const kms_key_name = `${name_prefix}-${system_name}-${system_env}-key`
const s3_bucket_name = `${name_prefix}-${system_name}-${system_env}-bucket`.toLowerCase()

// Create stacks
const kms_key_stack = new KmsKeyStack(app, 'kmskey', kms_key_name,
  { stackName: kms_key_name });
const s3_bucket_stack = new S3BucketStack(app, 's3bucket', s3_bucket_name,
  kms_key_stack.key,
  { stackName: s3_bucket_name })

// Define stack dependencies
s3_bucket_stack.addDependency(kms_key_stack, 'Using encryption key')

// Tagging
cdk.Tag.add(kms_key_stack, "system", system_name)
cdk.Tag.add(kms_key_stack, "env", system_env)
cdk.Tag.add(s3_bucket_stack, "system", system_name)
cdk.Tag.add(s3_bucket_stack, "env", system_env)
