import * as cdk from '@aws-cdk/core';
import s3 = require('@aws-cdk/aws-s3');
import s3deploy = require('@aws-cdk/aws-s3-deployment');
import kms = require('@aws-cdk/aws-kms');

export class S3DeploymentStack extends cdk.Stack {

  constructor(scope: cdk.Construct, id: string,
    bucket_name: string, encryption_key: kms.Key, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 bucket
    const bucket = s3.Bucket.fromBucketName(
      this, bucket_name, bucket_name
    )

    // Deploy test data
    const deploy_source = s3deploy.Source.asset(`s3assets`)
    const deploy_contents = new s3deploy.BucketDeployment(
      this, bucket_name + `-deploy`,
      {
        destinationBucket: bucket,
        sources: [deploy_source],
        serverSideEncryption: s3deploy.ServerSideEncryption.AWS_KMS,
        serverSideEncryptionAwsKmsKeyId: encryption_key.keyId
      }
    )
  }

}
