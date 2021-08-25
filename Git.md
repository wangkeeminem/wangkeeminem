Git版本控制

git简介

git命令行操作

git图形化界面操作

git服务器环境搭建

## 1.版本控制

git不止可以管理文件，还可以管理他的内容，用于解决多人开发的协同效率问题

### 版本控制工具需要具备的功能

+ 协同修改
+ 数据备份 可以保存每个提交的历史状态
+ 版本控制 保存文件系统的快照 不保存重复数据
+ 权限控制 可以对团队外的代码进行审核
+ 历史记录 修改的各种信息，本地恢复历史状态
+ 分支管理，多线同时推进

git本地就可以进行完整的版本控制，不同于集中式的版本控制（SVN）。

分布式的版本控制可以避免单点的故障。

talk is cheap show me the code！

2008年Github上线

## 2.git优势

+ 大部分在本地完成，不需要联网

+ 完整性保证 使用hash保证内容完整性
+ 尽可能添加而不是删除或修改数据
+ 分支操作非常快捷流畅 以快照方式进行管理（创建与移动指针）
+ 与linux命令全面兼容

## 3.git的本地结构

工作区：开发写代码的地方 **git add**添加到暂存区

暂存区：临时存储   使用**git commit**提交到本地库

本地库：存储历史版本

## 4.git与github

代码托管中心：用于维护远程库

局域网下：gitlab服务器

外网环境下：github gitee

#### 本地与远程库的交互：

团队内部协作下：项目经理建立本地库 **push**至远程库，程序员将远程库**clone**下来并进行初始化，修改后，提交至本地库并**push**推送至远程库（加入团队的条件下）。后续项目经理可以将项目**pull**回来至自己的本地库。

跨团队协作：项目经理fork至外部人员自己的库里，由外部人员进行**clone和push**操作，外部人员可以进行**pull** **request**，由项目经理进行审核并**merge**（合并）

## 5.命令行操作

###   本地操作：

+ 初始化：git init

ll：当前所有文件  ll 文件夹名：查看文件夹内目录

ls -la：当前所有文件（包含.   ..） 包含隐藏文件 ls -lA是只显示应有的

新建目录：mkdir 文件名 起始就是将要建立的项目

​      初始化：**git init**  在项目文件当中？

打开文件：cat .git/config

用户系统目录：cd ~

pwd:查看当前所在目录

.git文件夹：存放本地库的相关子目录与文件

```
-rw-r--r-- 1 86158 197609  23 Jul  3 17:55 HEAD
-rw-r--r-- 1 86158 197609 130 Jul  3 17:55 config
-rw-r--r-- 1 86158 197609  73 Jul  3 17:55 description
drwxr-xr-x 1 86158 197609   0 Jul  3 17:55 hooks/
drwxr-xr-x 1 86158 197609   0 Jul  3 17:55 info/
drwxr-xr-x 1 86158 197609   0 Jul  3 17:55 objects/
drwxr-xr-x 1 86158 197609   0 Jul  3 17:55 refs/
```

+ 设置签名

  + 形式：用于标识开发人员身份，不需要真实可用 例如

    用户名：tom

    email地址：sss@dasd.das

  + 作用：区分不同开发人员身份，与github账户没有关系

  + 命令（两者都没有是不允许的）：

    + 仓库级别/项目级别：:smile:只在当前本地库范围有效，**优先于系统用户级别**，设置签名后生效，所处目录：当前**.git下**,

      + git config user.name tom_pro
      + git config user.email good@ddasda.com

      ```
      [core]
              repositoryformatversion = 0
              filemode = false
              bare = false
              logallrefupdates = true
              symlinks = false
              ignorecase = true
      [user]
              name = wangke
              email = 408921421@qq.com
      
      ```

      

    + 系统用户级别：登录操作系统的用户，默认级别，所处目录：系统目录下：进入~，使用ls -lA可以 查看到 

      + git config --global user.name tom_pro
      + git config --global  user.email good@ddasda.com

      ```
      $ cat .gitconfig
      [user]
              name = wangke
              email = 408921421@qq.com
      [http]
              sslVerify = false
              proxy = http://127.0.0.1:1181
      [https]
              proxy = http://127.0.0.1:1181
      
      ```

## 6.添加提交以及查看状态操作

查看git的文件提交状态**git status**

添加所有：git add .

提交所有：

```
$ git status
On branch master//在主干分支上

No commits yet //没什么已经提交的东西

Untracked files://没有追踪的文件 
  (use "git add <file>..." to include in what will be committed)//可使用add 加文件名将其包含到暂存区
        .eslintrc.js
        .gitignore
        README.md
        dsa.js
        index.html
        package-lock.json
        package.json
        public/
        src/
        tsconfig.json
        vite.config.ts

nothing added to commit but untracked files present (use "git add" to track)//没有放到暂存区，但是还有未追踪的文件

```

vim小命令：linux下vim进入编辑器，esc=》 :w filename进行命名，：wq保存退出  :set nu显示行号

提交文件到残存区：**git add hahaha**

```
$ git add hahaha
warning: LF will be replaced by CRLF in hahaha.//决定每一行的结尾时使用什么风格，在安装时定义的，windows  会修改文件的内容
The file will have its original line endings in your working directory
//在工作目录中会保持原始的换行符
```

把刚才的提交撤回哦:

**git rm --cached  hahaha.txt**  rm是linux里的删除命令哦

```
Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

```

从暂存区提交到本地库：

**git commit hahaha.txt**

提交后会弹出vim编辑对话框：输入提交信息，

相当于提交的说明 注释，编辑后退出

```
$ git commit hahaha.txt
warning: LF will be replaced by CRLF in hahaha.txt.
The file will have its original line endings in your working directory
[master (root-commit) 5ddd7ab] My first commit hahaha.txt//5ddd7ab 提交形成的版本号
 1 file changed, 4 insertions(+)//几个文件 几行被修改了
 create mode 100644 hahaha.txt//新创建了文件

```

如果提交后进行了文件修改：

查看status会提醒文件有修改:

```
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)//update 暂存区会进行update而非新建
  (use "git restore <file>..." to discard changes in working directory)//可以进行版本回退
        modified:   hahaha.txt
no changes added to commit (use "git add" and/or "git commit -a") 这里的文件已经被追踪 可以使用add 然后coommit 或者也可以直接使用commit

```

+ 使用git add再次提交修改后的：

```
$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   hahaha.txt

```

+ 再次提交commit ：如不适用vim编辑器进行说明性描述：

**git commit -m ”my second commit，modify hahaha.txt“ hahaha.txt**

```
$ git commit -m"my second commit,modify hahaha.txt" hahaha.txt
warning: LF will be replaced by CRLF in hahaha.txt.
The file will have its original line endings in your working directory
[master dcb2e5a] my second commit,modify hahaha.txt
 1 file changed, 2 insertions(+), 1 deletion(-)//两行修改 删除了一个字符

```

**小结：**

+ 状态查看 git status 工作区状态 

+ 添加 git add filename  
+ 撤回 git rm --cached  hahaha.txt

+ 提交  git commit -m ”my second commit，modify hahaha.txt“ hahaha.txt

## 7.版本的前进与后退

+ **git** **log **  空格向下翻页 b向上翻页  q退出       日志  
+ 美化显示：**git log --pretty=oneline ** 只会显示之前版本
+ **git log --oneline **hash简化一行显示 ** 只会显示之前版本
+ **git reflog** 会显示每次需要移动版本所需的次数  可以显示所有版本

```
$ git log
commit dcb2e5a9ee34d27c4a4eb933ffb415884f127ada (HEAD -> master) head指向的是当前的版本
Author: wangke <408921421@qq.com>
Date:   Wed Jul 28 18:39:37 2021 +0800 //提交日志

    my second commit,modify hahaha.txt

commit 5ddd7ab87f7e678d6971e3b7584fbfc444fd7d1c
Author: wangke <408921421@qq.com>
Date:   Wed Jul 28 18:18:24 2021 +0800

    My first commit hahaha.txt

```

美化显示：git log --pretty=oneline

```
a52d5b016980695afc021d27fd635c1dce7ad9f6 (HEAD -> master) my third commit
dcb2e5a9ee34d27c4a4eb933ffb415884f127ada my second commit,modify hahaha.txt
5ddd7ab87f7e678d6971e3b7584fbfc444fd7d1c My first commit hahaha.txt

```

hash简化显示 git log --oneline

```
a52d5b0 (HEAD -> master) my third commit
dcb2e5a my second commit,modify hahaha.txt
5ddd7ab My first commit hahaha.txt

```

**git reflog**：辅助版本控制

```
a52d5b0 (HEAD -> master) HEAD@{0}: commit: my third commit
dcb2e5a HEAD@{1}: commit: my second commit,modify hahaha.txt
5ddd7ab HEAD@{2}: commit (initial): My first commit hahaha.txt
```

**版本控制的本质：使用指针head去引用**

## 8.版本控制

+ 基于索引值 推荐
+ 使用^符号
+ 使用~符号



1.**基于索引值 head**：回退 前进  都是使用head进行索引

git reset --hard 索引值（拿一小部分就能找到）

$ git reset --hard a52d5b0

查看版本信息可以看到head移入到指定的版本

```
$ git reflog
5ddd7ab (HEAD -> master) HEAD@{0}: reset: moving to 5ddd7ab
a52d5b0 HEAD@{1}: commit: my third commit
dcb2e5a HEAD@{2}: commit: my second commit,modify hahaha.txt
5ddd7ab (HEAD -> master) HEAD@{3}: commit (initial): My first commit hahaha.txt

```

**2.使用符号^:亦或符号 只能往后**

git reset --hard HEAD^ 回退一步   两步就是两个^^

**3.使用~指定后退步数：**

git reset --hard HEAD~3 只能后退

相关命令帮助文档的打开：

git help XXX  git help reset

## 9.soft mixed模式--hard模式

soft模式不会干涉暂存区和工作区，仅仅移动了本地库的指针

mixed 本地库移动指针，暂存区重置，但是不会改动工作区

hard：三区一致 本地库类指针移动、工作缓存区都会移动

通过调整git reset --hard HEAD 使三区版本保持一致

## 10.动作区删除文件找回

rm文件 之后

add 文件名  

然后提交 -m”description“ XXX 

```
86158@DESKTOP-JMQKKL2 MINGW64 /f/前端/my blog/myblognew (master)
$ git commit -m"delete aaa.txt" aaa.txt
[master 89b9465] delete aaa.txt
 1 file changed, 3 deletions(-)
 delete mode 100644 aaa.txt
```

git不会把任何版本的提交记录给删除，删除同时也是一次提交记录，可以进行恢复。

通过查看版本记录并提交reset 可以找回该文件。当然也可以跳到删除对应的那个版本 89b9465

```
$ git reflog
89b9465 (HEAD -> master) HEAD@{0}: commit: delete aaa.txt
f48c53f HEAD@{1}: commit: my first aaa.txt
a52d5b0 HEAD@{2}: reset: moving to a52d5b0
dcb2e5a HEAD@{3}: reset: moving to HEAD
dcb2e5a HEAD@{4}: reset: moving to dcb2e5a
5ddd7ab HEAD@{5}: reset: moving to 5ddd7ab
a52d5b0 HEAD@{6}: reset: moving to a52d5b0
5ddd7ab HEAD@{7}: reset: moving to HEAD~2
a52d5b0 HEAD@{8}: reset: moving to a52d5b0
5ddd7ab HEAD@{9}: reset: moving to HEAD^^
a52d5b0 HEAD@{10}: reset: moving to a52d5b0
5ddd7ab HEAD@{11}: reset: moving to 5ddd7ab
a52d5b0 HEAD@{12}: commit: my third commit
dcb2e5a HEAD@{13}: commit: my second commit,modify hahaha.txt
5ddd7ab HEAD@{14}: commit (initial): My first commit hahaha.txt

86158@DESKTOP-JMQKKL2 MINGW64 /f/前端/my blog/myblognew (master)
$ git reset --hard f48c53f

```

## 11.暂存区的删除文件找回

通过add将删除的文件增加到了暂存区，这时候再进行找回：

**git reset --hard 将暂存区 工作区按照本地库版本进行刷新**

**小结：**

删除文件并找回：

**前提**：删除前 文件的删除操作提交到了本地库

操作 git reset --hard【指针位置】



## 12.文件的比较

git diff 文件名：他是将暂存区与工作区进行比较 

红色表示删除掉的

绿色增加的

git diff HEAD apple.txt 与本地库进行比较

git diff HEAD^  apple.txt与本地库上一个版本进行比较

不带文件名的话，可以比较库中的多个文件 

没有变化的文件不会进行diff！

## 13.git的分支

使用多条线同时推进多个任务时：

不想影响Master主干分支的情况下，开辟新的分支

+ 首先 新的分支创建时是一致的，然后各自向前推进，分支之间彼此**独立并行**。如果某一个分支出现了问题，直接删除这个分支**不会对**主干产生任何影响。
+ 功能开发成功，可以**合并**到主干，主版本的大升级
+ 主干出现bug通过hot_fix进行热修复=》开辟分支 修复 合并 **实现热修复**



通过satus查看当前分支，通过

**branch -v 查看所有分支** 标绿的为当前的分支

```
$ git branch -v
* master f48c53f my first aaa.txt
```

**新建**分支：

```
**git branch XXX分支名**
```

**切换**到分支：checkout

```
git checkout 分支名
```

在新的分支上进行修改提交后（add commit） 分支版本出现了分离

```
$ git branch -v
* hot_fix 22c22a1 test branch
  master  f48c53f my first aaa.txt
```

分支合并**到**master：

+ 首先 切换到master git checkout master
+ 执行  更新当前的master

```
$ git merge hot_fix
Updating f48c53f..22c22a1
Fast-forward
 aaa.txt | 4 +++-
 1 file changed, 3 insertions(+), 1 deletion(-)
```

```
$ git branch -v
  hot_fix 22c22a1 test branch
* master  22c22a1 test branch
版本回归一致
```

## 14.master和分支都更改 了相同的文件 产生了冲突

```
$ git branch -v
* hot_fix 5f55546 test conflict hot_fix
  master  6e1c418 test conflic
```

两个分支都通过add commit进行更改

这个时候如果再进行合并的话：

```
86158@DESKTOP-JMQKKL2 MINGW64 /f/前端/my blog/myblognew (hot_fix)
$ git merge master
Auto-merging aaa.txt
CONFLICT (content): Merge conflict in aaa.txt
Automatic merge failed; fix conflicts and then commit the result.

86158@DESKTOP-JMQKKL2 MINGW64 /f/前端/my blog/myblognew (hot_fix|MERGING)
```

会提醒失败，并且切换到(hot_fix|MERGING)状态

冲突文件打开：需要工程人员手动进行删除 更改 

```
<<<<<<< HEAD
jdshajkdhjkas
dkjhsdkj
dhjkshdkj
njcj
jdkshdjk
======= 此上为当前分支内容 
aaaaaaaaaa
bbbbbbdlksjadklbbbbbbbb
dslkdkdjl
jdhsjkd
jfiorewe
ddddddddd
>>>>>>> master  此上为将要合并进来的分支内容

```

然后使用git add 文件名

git commit -m “日志”（**注意不可以带文件名**） 解决merge冲突

```
86158@DESKTOP-JMQKKL2 MINGW64 /f/前端/my blog/myblognew (hot_fix|MERGING)
$ git commit -m "resolve conflict"
[hot_fix b7c9604] resolve conflict

86158@DESKTOP-JMQKKL2 MINGW64 /f/前端/my blog/myblognew (hot_fix)

$ git branch -v
* hot_fix b7c9604 resolve conflict 冲突解决 合并后的版本更新
  master  6e1c418 test conflic

```

## 15.git基本原理 

1.hash算法： 加密 明文=》加密算法=》密文

①长度是一定的

②输出是确定的

③不可逆 不可变 

2.快照

svn只会保存更改，进行叠加

git是对每个版本保存一个快照，没有更改的文件会指向前一版本的文件

每个文件的hush形成一整个tree对象 形成一个hush，提交对象也会有一个hush的tree对象 形成一个hush，

每个版本对应一个hush，版本之间通过parent形成父子对象。

3.分支管理

首次提交 root commit=》形成master=》创建分支后=》新建一个指针（svn是复制文件 可太笨了）=》后续分支中提交时，只会影响他对应的head。

通过切换head来切换分支，而不需要去切换文件。=》merge 合并，指针合并，实质上才形成了分叉。

## 16.远程git

创建远程库：

项目负责人：本地库=》远程库：push  反过来 pull

程序员：远程库=》本地库 clone  反过来push

![image-20210728215100391](C:\Users\86158\AppData\Roaming\Typora\typora-user-images\image-20210728215100391.png)

**删除本地git仓库**：$ rm -rf .git

一次提交所有：

1. **git add .**
2. $ git commit -a -m "myblog 1.0"

创建远程库

将本地库push到远程库：https://github.com/wangkeeminem/myblognew.git 远程库地址

**git remote -v**查看当前本地库对应的远程地址

**git remote add origin** 地址  用来初始化远程库地址

```
$ git remote -v
origin  https://github.com/wangkeeminem/myblognew.git (fetch)
origin  https://github.com/wangkeeminem/myblognew.git (push)

```

**执行推送**： **git push origin master分支名**） 注意改一下github的代理为usa 和关闭拦截

###### origin是设置的远程地址别名，master是设置的远程地址分支名

```
86158@DESKTOP-JMQKKL2 MINGW64 /f/前端/my blog/myblognew (master)
$ git push origin master
Enumerating objects: 165, done.
Counting objects: 100% (165/165), done.
Delta compression using up to 4 threads
Compressing objects: 100% (143/143), done.
Writing objects: 100% (165/165), 635.20 KiB | 10.41 MiB/s, done.
Total 165 (delta 8), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (8/8), done.
To https://github.com/wangkeeminem/myblognew.git
 * [new branch]      master -> master
```

**clone**操作：

进入项目空目录 **git clone 地址**

会把项目作为一个文件夹克隆进来mcd进入， ls -la  可以查看到在文件夹下自建了一个.git文件

即克隆下来的自动进行了git初始化操作

```
86158@DESKTOP-JMQKKL2 MINGW64 /f/前端/git/code/myblogclone/myblognew (master)
$ ls -la
total 323
drwxr-xr-x 1 86158 197609      0 Jul 28 23:16 ./
drwxr-xr-x 1 86158 197609      0 Jul 28 23:16 ../
-rw-r--r-- 1 86158 197609    404 Jul 28 23:16 .eslintrc.js
drwxr-xr-x 1 86158 197609      0 Jul 28 23:16 .git/
-rw-r--r-- 1 86158 197609     50 Jul 28 23:16 .gitignore
-rw-r--r-- 1 86158 197609   1597 Jul 28 23:16 README.md
-rw-r--r-- 1 86158 197609 264240 Jul 28 23:16 dsa.js
-rw-r--r-- 1 86158 197609   1106 Jul 28 23:16 index.html
-rw-r--r-- 1 86158 197609  31983 Jul 28 23:16 package-lock.json
-rw-r--r-- 1 86158 197609    606 Jul 28 23:16 package.json
drwxr-xr-x 1 86158 197609      0 Jul 28 23:16 public/
drwxr-xr-x 1 86158 197609      0 Jul 28 23:16 src/
-rw-r--r-- 1 86158 197609    679 Jul 28 23:16 tsconfig.json
-rw-r--r-- 1 86158 197609    549 Jul 28 23:16 vite.config.ts

86158@DESKTOP-JMQKKL2 MINGW64 /f/前端/git/code/myblogclone/myblognew (master)
$ git status
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean

```

## 17.邀请其他人加入团队成员

setting=》manage access =》invite  对于加入的成员，拥有push的权限

## 18.拉回 pull

pull实际是fetch 和merge两个操作的合并

fetch 在原项目目录下：**$ git fetch origin master**

然后通过 **git checkout origin/master** 可以切换到此拉回来的分支

切换回master：

**git merge origin/master** 将origin/maste合并至master

注意这里面的/ 和空格  origin是设置的远程地址别名，master是设置的远程地址分支名



如果数据修改比较简单的话，直接使用pull完成上述两个操作，但是不是很保险哦！！

## 19.协同开发时冲突的解决

远程库只会接收状态一致的本地库的推送、因此同一份pull下来的本地库，谁先推送就会影响后续的其他人的推送。

这个时候github会拒绝后面的一次推送， 

解决：第二次推送者需要先**pull**回来=》**按照分支冲突解决merge问题**，=》**再进行推送**



## 20.打tag：

1. ```
   1. 比如：我现在给当前代码，提交tag:v1.0.0
   2. 
   3. \# 本地修改 tag
   4. git tag -a 1.0.0 -m "1.0.0"
   5. \#提交数据至远端
   6. git push origin master
   7. 
   8.  
   9. \# 提交tag至远端
   10. git push origin --tag
   11. 
   12. \# 成功，登录github查看即可
   ```

   

21.总代码量统计：

```
git log --author="wangke" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -

result：
added lines: 7383, removed lines: 309, total lines: 7074

$ git log --author="wangke" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -
added lines: 2488, removed lines: 4, total lines: 2484


```

##  21.分支取消

 **删除一个已被终止的分支**

如果需要删除的分支不是当前正在打开的分支，使用branch -d直接删除

```
git branch -d <branch_name>
```

**• 删除一个正打开的分支**

如果我们在试图删除一个分支时自己还没转移到另外的分支上，Git就会给出一个警告，并拒绝该删除操作。

如果坚持要删除该分支的话，就需要在命令中使用-D选项。

```
git branch -D <branch_name>
```

