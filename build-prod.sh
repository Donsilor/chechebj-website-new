#!/bin/zsh
cd dist
tar -zcvf cheche-new.tar.gz *
scp cheche-new.tar.gz root@114.116.20.44:/jboss/apps/
ssh root@114.116.20.44 "bash /jboss/apps/build-cheche-new.sh"
