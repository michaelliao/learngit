1���ڰ汾�ֿ⣨repository,һ��Ŀ¼�����Ҽ�git bash�Զ���λ���汾�⣬����Ŀǰ״̬������git����ͨ��git init���ܳ�ʼ����Ŀ¼��ʹ֮��Ϊ�汾�ֿ⣻����ִ�к��и����ص�.lsh�ļ�����

2���ڸ�Ŀ¼������һ���ļ�readme1.txt��readme2.txt���ļ�������㣻
git add readme1.txt readme2.txt         �����ύ��������  ����ļ��ո����
git commit -m "˵��"                    ��ʽ�ύ
git status                              �鿴��ǰ�ļ�״̬ ��Щ�ļ��ı���
git diff                                diff��Ϊdifferent   ��show different 
git log 								�鿴�ύ��־
git log -pretty=oneline  				����ʽ�鿴�ύ��־
git reset --hard head^					�汾�ع�����һ���汾
git reset --hard head^^					�汾�ع�������һ���汾   ͬ�� --hard head^^^ ������һ���汾
git reset --hard head~10				�汾���˵�֮ǰ��10���汾
git reset --hard 12312412...			����git log��־��ʾ��id���˵��ض��汾
git reflog 								�鿴�ύ��¼��־  
git checkout -- readme.txt  			���޸ĵ��ļ�����ȫ������ 1��δadd����������ֱ�ӻع���ԭʼ�汾 			2����add����������ô�ڴ��޸ĵ����ݾͻ᳷�������ص�add��İ汾 ���� �ļ��Ѿ�git add Ȼ���������һ������ ��ʱ��git checkout�Ļ���ô�������ݾͱ�����
git checkout ��ʵ�ǰ汾���������滻������������
git reset head readme.txt   			git add���ݴ��������ݻᱻ��������ʱ���ݴ������Ǹɾ���  ��ע��������ݴ����Ǹɾ��� �����޸���Ȼ����ֻ��ûgit add
git rm a.txt							�Ӱ汾����ɾ���ļ�   



 


ע��㣺
	git commit ֻ�ύ�ݴ�����stage�����ļ� ���ļ�����ͨ��git add�������ӵ��ݴ���  commit�Ὣ�ݴ������ļ��ύ��git�����Ǵ����ķ�֧master��ȥ
	git diff ��ʾ���ǵ�ǰ�ļ����ݺ��ϴ��Ѿ��ύ������֮��ıȽϣ������Ǻ�git add�����ıȽ�
	����ļ�����޸������ݣ�ÿ�ζ��޸ĺ�git add����ûcommit�����������ͳһ�ύ �������ļ����޸ĵĹ��̷�ֹ������Զ��git add
	head���Ա�ʾ����ָ�����µİ汾�������commit�İ汾
	.gitĿ¼���Կ����ǰ汾��   ����������git init��Ŀ¼ git add��������ǰ汾��
	
	
	
�ڱ��غ�Զ�̽����ÿ��ͨ��git remote add origin git@server-name:path/repo-name.git���������⣻
��һ�ν�����commit���ļ�������Զ�̿�ͨ��git push -u origin master   
�Ժ�ÿ���ύ�Ͳ���Ҫ-u  
master -- > master  �����ط�֧master�ύ��Զ��GitHub��master��֧

��������Ŀ˳��Ҳ���� Զ��GitHub�Ѵ��ڿ��ˣ�������Ҫ��¡
����Զ�̴���spring�⣬�ڱ��ؽ���һ�����⣨Զ��spring������clone�������ļ���  ��ʼ����Ŀ¼ʹ֮��Ϊgit����Ĳֿ�
ͨ������git clone git@github.com:yxf9527/Spring.git����
	
	
	

             
