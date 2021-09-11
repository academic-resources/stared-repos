# LambdaSchool
projects for Lambda School full-stack web development track:
(see below the list for how to set a repository up like this, read them in full before following them)
/m#/##_#/ corresponds to the following: 

## Directory:
- m1 = Module 1 Web Fundamentals
  * Unit 1(1) User Interface and Git 
      - Chapter A User Interface I
      - Chapter B Git for Web Development
      - Chapter C User Interface II
      - Chapter D User Interface III
  * Unit 2(2) Advanced CSS
      - Chapter A Responsive Design I
      - Chapter B Responsive Design II
      - Chapter C Preprocessing I
      - Chapter D Preprocessing II
  * Unit 3(3) JavaScript Fundamentals
  * Unit 4(4) WEB Unit 1 Build
- m2 = Module 2 Web Applications I
  * Unit 1(5) Applied JavaScript
  * Unit 2(6) Intro To React
  * Unit 3(7) Single Page Applications
  * Unit 4(8) WEB Unit 2 Build
- etc

## Directions on how to set up this repository:

Follow this guide at your own risk.  Make sure you understand what's going on before doing all this.  This starts assuming you have no folder set up or repository set up.

**You need a naming system.**<br>
	I have made up a naming system that you are welcome to use.<br>
	For this to work most efficiently, you need a naming system.
- Lambda (Example: X:/)
	* m1 (Modules 0-10)
		- 11a1 (1-1A. Project 1)
		- 11b1 (1-1B. Project 1)
		- 11c1 (1-1C. Project 1)
		- 11d1 (1-1D. Project 1)
		- Module#-Sprint#-DayLetter-Project# (without the hashes; 11a1 which will stand for module 1, sprint 1, day 1/monday, project 1, whose branchname would be 11a1, and 11a1m would be its master branchname)

### One-Time Set-Up:<br>
1. Create github repository, note/copy git link (*https://www.github.com/yourusername/yourLambdaProjectRepository.git*).<br>
2. Add TL as collaborator.<br>
3. Create your local directory where you want to stash all your lambda projects (i suggest mapping it).<br>
4. __cd__ to this local directory (Example: cd  *X:/m1/11a1/* or cd */x/m1/11a1m*).<br>
5. __git clone *https://www.github.com/yourusername/yourLambdaProjectRepository.git__<br>
6. Start with creating an empty folder of where you want your first project to go.<br>
	- Use naming scheme to name module folders (0 or 1 through 9 or 10) and project folders, which will be subfolders of their respective modules.<br>
		*suggest naming projects by *m#/Module#Sprint#DayLetterProject#*.  (Example: *X:/m1/11a1/*)<br>
	- You can make as many folders as you want ahead of time, but they won't show up on Github until they aren't empty.<br>
	- If you put spaces in folder names, surround them w/ quotes when you need to use them.<br>
7. Regarding *.gitignore* -- add inside it any dir/file you want git to ignore; i have a single line in mine, *"/Administration/"*, the directory name to ignore followed by **two stars**, but **without the quotes**.<br>
	- Save this *.gitignore* in your local directory you just made where you will be stashing your Lambda projects.<br>
8. __cd__ in git bash to your mapped local umbrella directory (Example: *X:/*)<br>


### Do This With Each Project:
**Before You Start:**<br>
9.  __cd__ to your mapped local umbrella directory<br>
10. __mkdir *foldername*__ (remember you are making a subfolder of a module folder; one project, one folder; example: */x/m1/11a1*)<br>
11. __git checkout -b *branchnamem*__<br>
	- Do not use master, but make a new branch with "m" at the end which will signify the project's master branch.<br>
	- Do not put all the projects in their own folders all at once.  Do them one by one so you can track each one by branch.<br>
12. Download zip for new project.<br>
13. Unzip new project contents into desired folder.<br>
14. __git add .__<br>
15. __git commit -m "*branchnamem* initial project upload"__<br>
16. __git push --set-upstream origin *branchnamem*__<br>
17. __git merge master__ (optional if you are going to wait until TL merges to merge m branch into master)<br>
18. The previous steps we just did put all those project files into their own branch, which will be our base for comparison later.  The m can now designate that it is the project's 'master' branch.<br>
<br>

**Immediately Prior to Making Changes:**<br>
19. Now we need to make a new branch and add our project changes to it.<br>
20. __git checkout -b *branchname* (branch name without the m)__<br>
21. Make changes, do your project.<br>
22. __git add .__<br>
23. __git commit -m "*branchname* final project upload"__<br>
24. __git push --set-upstream origin *branchname*__<br>
25. Now, when you go to do a pull request for this project, the TL will always be on the project as a reviewer possibility.  After the first time, you will never have to wait for the TL to approve the collab request.  You can do the pull request one of two ways:<br>
	- You can compare *branchnamem* to *branchname*.  If you do it this way, you will have to merge *branchnamem* to master after TL merge.  When your TL merges, TL will be merging into *branchnamem* and you will have to merge *branchnamem* into *master*.<br>
	- If you merged to master already at step 17, you will compare *master* as base and *branchname* as compare.  When TL merges, TL will be merging your finished project into master.<br>
26. After either you or TL merges into master, while in git bash, do **git pull master**.<br>
