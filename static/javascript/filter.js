function showoption(){
var oClearList = $(".hasBeenSelected .clearList");
var infor = '';
var fpdm = $("#fpdm").val();
var fphm = $("#fphm").val();
var sjq = $("#sjq").val();
var sjz = $("#sjz").val();
var xfsh = $("#xfsbh").val();
var kddh = $("#kddh").val();
var qsrq = $("#qsrq").val();
fpdm_list = fpdm.split(";");
fphm_list = fphm.split(";");
xfsh_list = xfsh.split(";");
if (fpdm == null || fpdm == ""){
}else{
for(i=0;i<fpdm_list.length;i++){
infor += '<div class=\"selectedInfor selectedShow\" style=\"line-height:20px;\"><span>发票代码</span><label>' + fpdm_list[i] + '</label><em p="2"></em></div>';
};
};
if (fphm == null || fphm == ""){
}else{
for(i=0;i<fphm_list.length;i++){
infor += '<div class=\"selectedInfor selectedShow\" style=\"line-height:20px;\"><span>发票号码</span><label>' + fphm_list[i] + '</label><em p="2"></em></div>';
};
};
if (sjq == null || sjq == ""){
}else{
infor += '<div class=\"selectedInfor selectedShow\" style=\"line-height:20px;\"><span>开票日期</span><label>' + sjq + '</label><span> - </span><label>' + sjz + '</label><em p="2"></em></div>';
};
if (xfsh == null || xfsh == ""){
}else{
for(i=0;i<xfsh_list.length;i++){
infor += '<div class=\"selectedInfor selectedShow\" style=\"line-height:20px;\"><span>销方税号</span><label>' + xfsh_list[i] + '</label><em p="2"></em></div>';
};
};
if (kddh == null || kddh == ""){
}else{
infor += '<div class=\"selectedInfor selectedShow\" style=\"line-height:20px;\"><span>快递单号</span><label>' + kddh + '</label><em p="2"></em></div>';
};
if (qsrq == null || qsrq == ""){
}else{
infor += '<div class=\"selectedInfor selectedShow\" style=\"line-height:20px;\"><span>签收日期</span><label>' + qsrq + '</label><em p="2"></em></div>';
};
oClearList.html(infor);
}
function showoption2(){
var oClearList = $(".hasBeenSelected .clearList");
var infor = '';
var fpdm = $("#fpdm").val();
var fphm = $("#fphm").val();
var sjq = $("#sjq").val();
var sjz = $("#sjz").val();
var xfsh = $("#xfsbh").val();
var xfmc = $("#xfmc").val();
var kpje = $("#kpje").val();
var kpse = $("#kpse").val();
var kddh = $("#kddh").val();
var qsrq = $("#qsrq").val();
fpdm_list = fpdm.split(";");
fphm_list = fphm.split(";");
xfsh_list = xfsh.split(";");
if (fpdm == null || fpdm == ""){
}else{
for(i=0;i<fpdm_list.length;i++){
infor += '<div class=\"selectedInfor selectedShow\" style=\"line-height:20px;\"><span>发票代码</span><label>' + fpdm_list[i] + '</label><em p="2"></em></div>';
};
};
if (fphm == null || fphm == ""){
}else{
for(i=0;i<fphm_list.length;i++){
infor += '<div class=\"selectedInfor selectedShow\" style=\"line-height:20px;\"><span>发票号码</span><label>' + fphm_list[i] + '</label><em p="2"></em></div>';
};
};
if (sjq == null || sjq == ""){
}else{
infor += '<div class=\"selectedInfor selectedShow\" style=\"line-height:20px;\"><span>开票日期</span><label>' + sjq + '</label><span> - </span><label>' + sjz + '</label><em p="2"></em></div>';
};
if (xfmc == null || xfmc == ""){
}else{
infor += '<div class=\"selectedInfor selectedShow\" style=\"line-height:20px;\"><span>销方名称</span><label>' + xfmc + '</label><em p="2"></em></div>';
};
if (xfsh == null || xfsh == ""){
}else{
for(i=0;i<xfsh_list.length;i++){
infor += '<div class=\"selectedInfor selectedShow\" style=\"line-height:20px;\"><span>销方税号</span><label>' + xfsh_list[i] + '</label><em p="2"></em></div>';
};
};
if (kpje == null || kpje == ""){
}else{
infor += '<div class=\"selectedInfor selectedShow\" style=\"line-height:20px;\"><span>开票金额</span><label>' + kpje + '</label><em p="2"></em></div>';
};
if (kpse == null || kpse == ""){
}else{
infor += '<div class=\"selectedInfor selectedShow\" style=\"line-height:20px;\"><span>开票税额</span><label>' + kpse + '</label><em p="2"></em></div>';
};
if (kddh == null || kddh == ""){
}else{
infor += '<div class=\"selectedInfor selectedShow\" style=\"line-height:20px;\"><span>快递单号</span><label>' + kddh + '</label><em p="2"></em></div>';
};
if (qsrq == null || qsrq == ""){
}else{
infor += '<div class=\"selectedInfor selectedShow\" style=\"line-height:20px;\"><span>签收日期</span><label>' + qsrq + '</label><em p="2"></em></div>';
};
oClearList.html(infor);
}