import * as cdk from '@aws-cdk/core';
import s3 = require('@aws-cdk/aws-s3');
import s3deploy = require('@aws-cdk/aws-s3-deployment');
import s3assets = require('@aws-cdk/aws-s3-assets');
import kms = require('@aws-cdk/aws-kms');

export class S3BucketStack extends cdk.Stack {
  public readonly bucket: s3.Bucket;

  constructor(scope: cdk.Construct, id: string,
    bucket_name: string, encryption_key: kms.Key, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 bucket
    this.bucket = new s3.Bucket(
      this, bucket_name,
      {
        bucketName: bucket_name,
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        encryption: s3.BucketEncryption.KMS,
        encryptionKey: encryption_key,
        removalPolicy: cdk.RemovalPolicy.DESTROY
      }
    )

    // Deploy test data
    const deploy_contents = new s3deploy.BucketDeployment(
      this, `${bucket_name}-deploy`,
      {
        destinationBucket: this.bucket,
        sources: s3deploy.Source.asset(`../s3_contents`)
      }
    )

  }

}
// s3assets.Asset(this, `${bucket_name}-assets`, { path: '' })
