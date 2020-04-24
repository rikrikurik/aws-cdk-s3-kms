import * as cdk from '@aws-cdk/core';
import iam = require('@aws-cdk/aws-iam');
import s3 = require('@aws-cdk/aws-s3');
import kms = require('@aws-cdk/aws-kms');

export class IAMRoleStack extends cdk.Stack {
  public kms_allowed_role: iam.Role;
  public kms_denied_role: iam.Role;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create IAM role
    this.kms_allowed_role = new iam.Role(
      this, 'test role', {
        assumedBy: new iam.AccountPrincipal(this.account),
        description: 'IAM Role that allowd to use KMS key'
      }
    )
    this.kms_denied_role = new iam.Role(
      this, 'test role 2', {
        assumedBy: new iam.AccountPrincipal(this.account),
        description: 'IAM Role that prohibited to use KMS key'
      }
    )

    // Attach kms key policy to allowed_role
    
  }
}
