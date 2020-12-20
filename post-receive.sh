#!/bin/bash

while read oldrev newrev ref
do
  branch=`echo $ref | cut -d/ -f3`

  if [ "master" == "$branch" ]; then
    git --work-tree=/home/asata/asata.club checkout -f $branch
    echo 'Changes pushed live.'
  fi

  if [ "dev" == "$branch" ]; then
    git --work-tree=/home/asata/asata.club checkout -f $branch
    echo 'Changes pushed to dev.'
  fi
done