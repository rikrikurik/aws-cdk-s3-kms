import * as cdk from '@aws-cdk/core';
import kms = require('@aws-cdk/aws-kms');

export class KmsKeyStack extends cdk.Stack {
  public readonly key: kms.Key;

  constructor(scope: cdk.Construct, id: string, key_name: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create KMS Key for S3 encryption
    this.key = new kms.Key(
      this, key_name,
      {
        alias: key_name,
        description: 'For S3 encryption',
        removalPolicy: cdk.RemovalPolicy.DESTROY
      });
  }
}
