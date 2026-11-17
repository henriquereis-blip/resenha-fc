cd "$(dirname "$0")"
{ cat head.html; echo '<div id="app"></div><script>'; cat data.js logic.js ext.js ext2.js ext3.js ext4.js ext5.js ui.js ui2.js ui3.js ui5.js ext6.js tail.js; echo '</script>'; } > noext7.html
