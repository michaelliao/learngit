��ʦ����̫��ϸ�׶��ˣ�С������һ����������ˣ����Һ������ԭ����Ϊ���˿��ӻ���github desktop���Ϊʲô��Ҫ��git�������أ�ѧ��֮���֣���װ*������������������ʦҪ�����ҵ�request�����ô���Ҳ�ǽ�εĴ���ҵ����
һ������Զ�̿⣺

1.��github�˺Ŵ����µĲֿ⣬����git@github.com:SnowKingNo1/learngit.git

2.ִ������ git remote rm origin
Ȼ��git@github.com:SnowKingNo1/learngit.git

3.�����ؿ����͵�Զ��
git push -u origin master
�����޸Ļ��ߴ������ļ�֮����Ҫ����Զ�ֿ̲�Ļ�Ҫִ����������

1.���������ļ�test.txt

2.git add test.txt

3.git commit -m "update test.txt"

4.����Զ�̿����������ǵ�һ�����ӣ����ӹ��˾�ֱ��ִ�в���5��

5.git push -u origin master
�������
����������֧��branch����

1.git checkout -b dev
or
git branch dev
git checkout dev

2. git branch �鿴��ǰ��֧

3.git add test.txt
git commit -m "branch test"

4.git checkout master

5.git merge dev ����֧dev�ϲ���master����֧

6.git branch -d dev ɾ����֧dev

7.�鿴��ǰ��֧ git branch
�ġ�Bug��֧����һ����֧�Ĺ���û������������һ����֧�Ľ�������ʱʹ��stash���浱ǰ��֧����

1.�ڵ�ǰ��ִ֧��git stash���浱ǰ��֧������Ȼ���л�������������֧��һ�����л���master��֧���л���������֧

2.ִ���������֧�����ϲ��ύ֮��ص���ǰ������֧���ָ���ǰ��֧����
git stash apply,ʹ��git stash pop ɾ��stash���ݣ�����������
�塢��ǩ������Ŀ����Ϊ��ͨ����̵ı�ǩ����������Ҫ�ҵ�����

1.������ǩ git tag v1.0

2.ĳһλ�� ������ǩ git tag v1.0 �汾��

3.����Զ�̵ı��ر�ǩ
git push origin --tags    (all tags)

git push origin v1.0 (ĳ����ǩ)

4.ɾ�����ر�ǩ
git tag -d ��ǩ

git push origin :refs/tags/��ǩ  ��ɾ��Զ�̱�ǩ��