 @echo off
 7z a -tzip krisha-lunch-teller.zip @listfile.txt
 aws s3 cp krisha-lunch-teller.zip s3://naresh-rohra-lamdas/krisha-lunch-teller.zip
 aws lambda update-function-code --function-name KrishaLunchTeller --s3-bucket naresh-rohra-lamdas --s3-key krisha-lunch-teller.zip --no-publish