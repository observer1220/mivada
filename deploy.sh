# Auto deploy to github
git add .
git commit -m "update at $(date "+%Y-%m-%d %H:%M:%S")"
git push origin main
echo "deploy success"