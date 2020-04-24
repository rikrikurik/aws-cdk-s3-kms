import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as KMSKey from '../lib/kms-key';
import * as S3Bucket from '../lib/s3-bucket';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const kms_stack = new KMSKey.KmsKeyStack(app, 'KMSKeyTestStack', 'kms_key_test');
    // THEN
    expectCDK(kms_stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});

test('Empty Stack', () => {
  const app = new cdk.App();
  // WHEN
  const s3_stack = new S3Bucket.S3BucketStack(app, 'S3BucketTestStack', 's3_bucket_test');
  // THEN
  expectCDK(s3_stack).to(matchTemplate({
    "Resources": {}
  }, MatchStyle.EXACT))
});
