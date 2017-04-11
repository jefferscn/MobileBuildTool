# ios项目自动打包

## 规格
- 预计用时: 6分钟
- 不能挂VPN

## 关键语句

进入文件,xcodebuild没法指定文件夹
```
cp /Users/bokeadmin/project/ios-pack/routes/pack/exportOptions.plist ./
xcodebuild -project  yesapp.xcodeproj -scheme yesapp -sdk iphoneos archive -archivePath $PWD/build/yesapp.xcarchive -configuration Release
xcodebuild -exportArchive -archivePath $PWD/build/yesapp.xcarchive -exportOptionsPlist exportOptions.plist -exportPath $PWD/build
```

## TODO

- change version

##输出

```
开始打包
预计用时: 6分钟
开始时间:  9:01:52 AM
[1]更新SVN-开始……
Updating '.':
At revision 6960.
[1]更新SVN-成功
[2]archive-开始……
archive SUCCESS 491671
[2]archive成功
[3]生成ipa-开始……
2016-11-15 09:10:07.132 xcodebuild[95268:17075869] [MT] IDEDistribution: -[IDEDistributionLogging _createLoggingBundleAtPath:]: Created bundle at path '/var/folders/hc/jcspn_q93830mlr8dz0jx1pr0000gn/T/yesapp_2016-11-15_09-10-07.119.xcdistributionlogs'.

1.2.840.113635.100.1.61

1.2.840.113635.100.
1.61

ipa SUCCESS 503912
[3]生成ipa-成功
[4]复制到发布文件夹-开始……
release SUCCESS
总用时: 8.412416666666667 分钟
[4]复制到发布文件夹-成功
[5]清理build文件夹-开始……
[5]清理build文件夹-成功
打包成功

```
