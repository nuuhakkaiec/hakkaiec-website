客家創新創業社｜網站第一版

【開啟】
直接以瀏覽器開啟 index.html 即可使用。首頁與插畫不依賴伺服器。
網路連線用於 Google 字型、Instagram 與 Google 行事曆、日後接入的表單。
字型無法連線時會使用系統中文字型。

【尚待提供】
1. 確認社團介紹、三創理念與首頁文案。
2. 實際專案名稱、介紹、照片、成果連結。
3. Google 行事曆已接入 nuu.hakkaiec@gmail.com（台北時區）。
4. Google 表單「填寫」連結。
5. 社團活動照片、照片說明與年度。
6. 歷屆年度、幹部名單、活動成果及公開文件。
網站目前沒有收集報名資料；待補上 Google 表單連結後，報名由 Google 表單處理。
插畫與專案內容均為提案示意，不代表社團實際活動。

【更新內容】
以文字編輯器開啟 content.js。每個欄位旁有說明，修改文字後存檔即可。
社團照片放在 assets 資料夾，再於 photos 陣列加入：
{src:'assets/活動照片.jpg', alt:'社員參加活動', caption:'活動名稱', year:'2026'}
請使用你們有權公開的照片與文件；不要把報名回覆或私人名冊放進公開網站。
projects 陣列改成真實專案後，將該項 demo 改為 false。
確認所有文案與資料後，將最上方 draft 改為 false，可移除整站草稿標籤。
各功能在無資料時有預備狀態，不會顯示假活動或假的報名成功訊息。
calendarEmbedUrl 需為 https://calendar.google.com/calendar/embed?... 格式。
Google 行事曆仍需由擁有者設定合適的公開閱覽權限；本網站不會修改帳號權限。

【放上 GitHub Pages】
1. 登入 GitHub，建立公開儲存庫，例如 hakka-club。
2. 將此資料夾「裡面」的所有檔案上傳到儲存庫根目錄。
   根目錄應直接看得到 index.html、styles.css、app.js、art.js、content.js、assets。
3. 開啟儲存庫 Settings → Pages。
4. Source 選 Deploy from a branch；選 main 分支、/(root)，儲存。
5. 等待 GitHub 顯示發布完成，使用 Pages 畫面提供的網址。
   網址通常是 https://你的帳號.github.io/hakka-club/。
這份網站不需要安裝套件、編譯或伺服器，也不需要提交任何帳號密碼。

【檔案】
assets/robot.svg：依社團提供照片繪製的分層 SVG 機器人，可匯入 Figma 編輯。
robot.js / robot.css：滑鼠移入自動揮手、笑眼與對話框，手機可輕點，亦支援鍵盤操作。奇異鳥會探頭、眨眼與小跳。
減少動態或暫停動畫時，打招呼會顯示靜態抬手與文字。
motion.js / motion.css：標題進場、插畫浮動、滑鼠視差、捲動進場；依新版 Figma 排版隱藏流動字帶。
右下角可暫停動畫；系統開啟「減少動態」時自動關閉動畫。
動態效果請在實際網頁查看，Figma 為靜態版面設計。
index.html：頁面架構
styles.css：版面、顏色、手機版與動畫
content.js：社團內容（平常主要修改這個檔案）
app.js：專案篩選、視窗、相簿、歷屆切換及 Google 連結
art.js / assets/*.svg：原創可縮放插畫

【設計檔】
https://www.figma.com/design/7zdu7K0bir0SaiAnoPHrEr

【相容性】
使用近期 Chrome、Edge、Firefox、Safari。支援鍵盤操作、Escape 關閉視窗與減少動態偏好。
GitHub Pages 發布需要由儲存庫擁有者登入設定；本次未代為發布。

【2026-10-07 更新】
figma-layout.css：依社團 Figma 的版面與字級調整；桌面首頁標題 60px、區塊標題 64px、內文 24px。
assets/kiwi.svg：依社團提供的手繪奇異鳥重畫，可直接拖入 Figma 編輯。
手機版依螢幕寬度調整字級。Google 行事曆已在瀏覽器確認載入。


【精選照片拼貼】
在 content.js 的 photos 填入照片；每组三張依序為左側、中央花瓣大圖、右側。中央照片建議使用接近正方形、人物置中的照片。照片支援點開放大。

【拍立得更新】
編輯 content.js 的 polaroids：src 為 assets/照片檔名.jpg，title 為標題，text 為說明。可增加或減少項目，留空會保留佔位框。舊示意專案已不顯示。

【歷屆幹部頁】
首頁「歷屆幹部」可開啟 members.html，預設第三屆。編輯 members-data.js 的 name（姓名）、photo（assets/照片.jpg）、bio（介紹）即可更新。共三屆，每屆四位；不要刪除引號，換行可用 \n。

【慣性滾動】
使用 Lenis 1.3.26，對應使用者提供的 lenis-main.zip。瀏覽器檔案與 MIT 授權已放在 vendor。lenis-setup.js 的 lerp:0.085 控制跟隨速度，越大越俐落。手機保留原生觸控；減少動態與暫停動畫時停用 Lenis。
