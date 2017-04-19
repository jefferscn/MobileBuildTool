# 客户部署发布环境

## 博科公司提供用于发布的App和相关文件

* ipa

* plist文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>items</key>
    <array>
      <dict>
        <key>assets</key>
        <array>
          <dict>
            <key>kind</key>
            <string>software-package</string>
            <key>url</key>
            <string>http://xxx.xxx.xx.xx</string>
          </dict>
        </array>
        <key>metadata</key>
        <dict>
          <key>bundle-identifier</key>
          <string>xx.xx.xx.xx</string>
          <key>bundle-version</key>
          <string>1.0.0</string>
          <key>kind</key>
          <string>software</string>
          <key>title</key>
          <key>XXXXX</key>
        </dict>
      </dict>
    </array>
  </dict>
</plist>
```

## 客户需要准备的环境

* https文件服务器

    用于存放博科公司提供的ipa和plist文件，在IOS OTA安装的时候需要plist文件必须部署在https服务器上，https的CA证书不能是自签名得到的，必须使用权威机构发放的证书。

## 操作步骤

* 上传博科公司提供的ipa文件到https服务器上

    保证可以通过浏览器正常访问,记录下ipa的访问地址

* 修改博科公司提供的plist文件中的ipa地址

    将上个步骤记录的下地址填写到plist文件的url对应的value里

    ```xml
            <key>url</key>
            <string>http://xxx.xxx.xx.xx</string>
    ```

* 上传修改过后的plist到https服务器上

    保证可以通过浏览器访问，记录下plist的访问地址

* 准备一个用于下载的网页

    可以单独做一个下载页面，也可以嵌入已有的页面。其中最主要的代码如下：

    ```html
        <a href="itms-services://?action=download-manifest&url=http://xx.xx.xx/xxx.plist">安装</a>
    ```

    >其中url后面填写上一步骤的plist访问地址

