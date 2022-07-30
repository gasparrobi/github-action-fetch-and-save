# fetch and save file javascript action

example:

```yaml
on: [push]

jobs:
  fetch-and-save-job:
    runs-on: ubuntu-latest
    name: fetch and save json data
    steps:
      - uses: actions/checkout@v2

      - name: fetch and save json data
        uses: gasparrobi/github-action-fetch-and-save@master
        id: hello
        with:
          fetch-url: 'https://example.com'
          file-path: ''
          file-name: 'data.json'

      - name: commit
        uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: commited by github action
```
