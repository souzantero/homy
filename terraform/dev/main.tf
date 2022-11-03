terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = var.region
}

data "aws_availability_zones" "available" {}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "2.77.0"

  name                 = "retaily-dev"
  cidr                 = "10.0.0.0/16"
  azs                  = data.aws_availability_zones.available.names
  public_subnets       = ["10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24"]
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    PROJECT = "retaily"
    STAGE   = "dev"
  }
}

resource "aws_db_subnet_group" "retaily_dev" {
  name       = "retaily-dev"
  subnet_ids = module.vpc.public_subnets

  tags = {
    PROJECT = "retaily"
    STAGE   = "dev"
  }
}

resource "aws_security_group" "rds" {
  name   = "retaily-dev-rds"
  vpc_id = module.vpc.vpc_id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    PROJECT = "retaily"
    STAGE   = "dev"
  }
}

resource "aws_db_parameter_group" "retaily_dev" {
  name   = "retaily-dev"
  family = "postgres13"

  parameter {
    name  = "log_connections"
    value = "1"
  }
}

resource "aws_db_instance" "retaily_dev" {
  identifier             = "retaily-dev"
  instance_class         = "db.t3.micro"
  allocated_storage      = 5
  engine                 = "postgres"
  engine_version         = "13.7"
  username               = "retaily"
  password               = var.db_password
  db_subnet_group_name   = aws_db_subnet_group.retaily_dev.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  parameter_group_name   = aws_db_parameter_group.retaily_dev.name
  publicly_accessible    = true
  skip_final_snapshot    = true

  tags = {
    PROJECT = "retaily"
    STAGE   = "dev"
  }
}
