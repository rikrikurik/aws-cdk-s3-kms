#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { KmsKeyStack } from '../lib/kms-key';

const app = new cdk.App();

// Get Context
const name_prefix = app.node.tryGetContext("name")
const system_name = app.node.tryGetContext("system_name")
const system_env = app.node.tryGetContext("env")
const kms_key_name = `${name_prefix}-${system_name}-${system_env}-key`

// Create stacks
const kms_key_stack = new KmsKeyStack(app, 'kmskey', kms_key_name, { stackName: kms_key_name });

// Tagging
cdk.Tag.add(kms_key_stack, "system", system_name)
cdk.Tag.add(kms_key_stack, "env", system_env)
