import * as cdk from '@aws-cdk/core';
import iam = require('@aws-cdk/aws-iam');
import s3 = require('@aws-cdk/aws-s3');
import kms = require('@aws-cdk/aws-kms');

export class IAMRoleStack extends cdk.Stack {
  public kms_allowed_role: iam.Role;
  public kms_denied_role: iam.Role;

  constructor(scope: cdk.Construct, id: string, name_prefix: string,
    props?: cdk.StackProps) {
    super(scope, id, props);

    // Create IAM role
    const kms_allowed_role_name = `${name_prefix}-kmsallowedrole`
    this.kms_allowed_role = new iam.Role(
      this, kms_allowed_role_name, {
      assumedBy: new iam.AccountPrincipal(this.account),
      description: 'IAM Role that allowd to use KMS key',
      roleName: kms_allowed_role_name
    }
    )
    const kms_denied_role_name = `${name_prefix}-kmsdeniedrole`
    this.kms_denied_role = new iam.Role(
      this, kms_denied_role_name, {
      assumedBy: new iam.AccountPrincipal(this.account),
      description: 'IAM Role that prohibited to use KMS key',
      roleName: kms_denied_role_name
    }
    )
  }

  attachPolicy(key: kms.Key, bucket: s3.Bucket) {
    // [allowed_role] Allow s3 access and kms key access
    bucket.grantReadWrite(this.kms_allowed_role)
    // [denied_role] Allow s3 action only  

  }

}
