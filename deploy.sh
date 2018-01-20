#!/bin/bash

aws s3 sync . s3://er-app --delete \
--exclude='node_modules/*' \
--exclude='.git/*' \
--acl public-read
