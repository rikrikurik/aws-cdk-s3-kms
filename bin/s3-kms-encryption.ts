#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { S3KmsEncryptionStack } from '../lib/s3-kms-encryption-stack';

const app = new cdk.App();
new S3KmsEncryptionStack(app, 'S3KmsEncryptionStack');
