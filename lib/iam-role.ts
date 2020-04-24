import * as cdk from '@aws-cdk/core';
import iam = require('@aws-cdk/aws-iam');
import s3 = require('@aws-cdk/aws-s3');
import kms = require('@aws-cdk/aws-kms');

export class IAMRoleStack extends cdk.Stack {

  constructor(scope: cdk.Construct, id: string,
    bucket: s3.Bucket, encryption_key: kms.Key, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create IAM role
  }

}
