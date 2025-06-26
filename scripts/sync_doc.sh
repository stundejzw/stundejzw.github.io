#!/bin/bash

cd docs
git add .
git commit -m 'update doc'
git push

cd ..
git add .
git commit -m 'update'
git pull
git push
