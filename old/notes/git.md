[//]: # (TITLE Git)
[//]: # (ENDPOINT /git)
[//]: # (PRIORITY 0)

# Git

Git is a **free and open source** distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

- [Git](#git)
        - [Table of contents](#table-of-contents)
    - [1 - Introduction](#1---introduction)
        - [1.1 - Version Control](#11---version-control)
            - [\> Local](#-local)
            - [\> Distant](#-distant)
            - [\> Distributed](#-distributed)
        - [1.2 - Git](#12---git)
            - [\> Singularities](#-singularities)
            - [\> Three stages](#-three-stages)
    - [2 - Git basics](#2---git-basics)

<!-- markdown-toc end -->

## 1 - Introduction

### 1.1 - Version Control

> **Version control** is a system that **records changes to a file or set of files** over time so that you can **recall** specific versions later.

#### > Local

<div class="floating-eg">

![](rcs.png)

<div>

One of the most popular VCS tools was a system called **RCS** (Revision Control System), which is still distributed with many computers today. RCS automates the storing, retrieval, logging, identification, and merging of revisions.

RCS works by **keeping patch sets** (that is, the **differences** between files) in a special format on disk; it can then re-create what any file looked like at any point in time by **adding up all the patches**.

</div>

</div>

#### > Distant

<div class="floating-eg">

![](cvcs.png)

<div>

**Centralized Version Control Systems** (CVCSs) were developed. These systems (such as CVS, Subversion, and Perforce) have **a single server that contains all the versioned files**, and a number of clients that check out files from that central place. For many years, this has been the standard for version control.
</div>

</div>

This setup offers many advantages, especially over local VCSs. For example, everyone knows to a certain degree what everyone else on the project is doing. Administrators have **fine-grained control** over who can do what, and it's far **easier to administer** a CVCS than it is to deal with local databases on every client.

However, this setup also has some serious downsides. The most obvious is the **single point of failure** that the centralized server represents. Local VCSs suffer from this same problem — whenever you have the entire history of the project in a single place, you risk losing everything.

#### > Distributed

This is where **Distributed Version Control Systems** (DVCSs) step in. In a DVCS (such as Git, Mercurial or Darcs), clients **fully mirror the repository**, including its full history. Thus, if any server dies, and these systems were collaborating via that server, any of the client repositories can be copied back up to the server to restore it. **Every clone is really a full backup of all the data**.

Furthermore, many of these systems deal pretty well with having several remote repositories they can work with, so you can collaborate with different groups of people in different ways simultaneously within the same project. This allows you to **set up several types of workflows** that aren't possible in centralized systems, such as hierarchical models.

![center-eg 50](dvcs.png)

### 1.2 - Git

</div>

#### > Singularities

1. Conceptually, git thinks of its **data** like a **series of snapshots of a miniature filesystem**, instead of a set of files and the changes made to each file over time (delta-based version control).
This makes Git more like a **mini filesystem** with some incredibly **powerful tools** built on top of it, rather than simply a VCS.

2. With Git, **nearly every operation is local**, which allows offline work. In many other systems, doing so is either impossible or painful.

3. Git has **integrity**: everything is **checksummed before it is stored** and is then referred to by that checksum. This means it's impossible to change the contents of any file or directory without Git knowing about it. This functionality is **built into Git at the lowest levels** and is integral to its philosophy.<br/>
  **You can't lose information in transit or get file corruption without Git being able to detect it**.<br/>
   The mechanism that Git uses for this checksumming is called a **SHA-1 hash**:<br/><div class="container-column">`24b9da6552252987aa493b52f8696cd6d3b00373`</div>

4. **Git generally only adds data**. It is hard to get the system to do anything that is not undoable or to make it erase data in any way. As with any VCS, **you can lose or mess up changes you haven't committed yet**, but after you commit a snapshot into Git, it is very difficult to lose, especially if you regularly push your database to another repository.

#### > Three stages

Git has **three main states** that your files can reside in:
- **Modified** --> you have changed the file but have not committed it to your database yet.
- **Staged** --> you have marked a modified file in its current version to go into your next commit snapshot.
- **Committed** --> the data is safely stored in your local database.

This leads us to the **three main sections of a Git project**:
- **Working tree** --> a **single checkout of one version** of the project. The files are **pulled out of the compressed database** in the Git directory and placed on disk for you to use or modify.
- **Staging area** --> a **file**, generally contained in your Git directory, that **stores information about what will go into your next commit**. Its technical name in Git parlance is the "index", but the phrase "staging area" works just as well.
- **Git directory** --> where Git **stores the metadata and object database** for your project. This is the most important part of Git, and it is what is copied when you clone a repository from another computer.

The basic Git workflow goes something like this:
1. You **modify files** in your working tree.
2. You **selectively stage just those changes** you want to be part of your next commit, which adds only those changes to the staging area.
3. You do a **commit**, which takes the files as they are in the staging area and **stores that snapshot permanently to your Git directory**.

## 2 - Git basics



