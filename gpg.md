### GPG
- 利用 brew 安装 gpg

  ```
  $ brew install gpg
  ```
- 生成密匙

  ```
  $ gpg —gen-key
  ```
  
- 查看密匙

  ```
  $ gpg —list-keys    #公匙
  
  $ gpg —list-secret-keys    #私匙
  ```
- 利用 user.signingkey 签署私匙

  ```
  $ git config --global user.signingkey randomstring    #最后参数为任意字符串
  ```
- 通过-s用私钥签名一个标签

  ```
  $ git tag -s v0.2 -m "signed version 0.2 released" fec145a
  ```
