
import Utils from '../utils/Utils'
import WXClass from '../wx/WXClass'
export const baseNativeJs = (funcName: string, params?: object, ios?: object) => {
	try {
		
	} catch (error) {
		console.log("nativejs error", error)
	}

}
export class NativeJs {
	baseWindow(funcName: string) {
		
	}
	/**
	 * 登陆
	 * 返回token
	 * @param callback 
	 */
	login(callback: Function): any {
		
	}

	/**
	 * 刷新token
	 */
	refreshtoken_load(): any {
		
	}

	/**
	 * 跳转支付
	 * @param ref_id  产品id
	 * @param ref_type 产品类型
	 * @param buyCycle 限制体验支付，或者自实现支付列表的时候，需要传此参数
	 */
	toPay(ref_id: any, ref_type: any, buyCycle?: object): any {
		// window['topay'] = function () {
		// 	delete window['topay'];
		// 	try {
		// 		// result = result;
		// 	} catch (e) {
		// 		console.log('出错！');
		// 	}
		// }
	
	}

	/**
	 * 应用内部跳转
	 * @param router 
	 */
	gorouter(router: string, iosRouter: string): any {
		return baseNativeJs('gorouter', { router }, { router: iosRouter })
	}

	baseShare(name, sharevalue: {
		"desc": string,
		"imageUrl"?: string,
		"shareType"?: string,
		"site"?: string,
		"siteUrl": string,
		"title": string,
		"titleUrl": string,
		"url": string,
		"eventId"?: string,
		"parameter"?: Object
	},footer:boolean=true) {
		
	}
	/**
	 * 分享到微信
	 * @param shareValue 
	 * @param desc 内容描述
	 * @param imageUrl img的url
	 * @param shareType 分享的类型
	 * @param site 网站名字
	 * @param siteUrl 网站链接
	 * @param title 分享标题
	 * @param titleUrl 标题的url
	 * @param url 本身的链接
	 */
	shareWeiXin(sharevalue: {
		"desc": string,
		"imageUrl"?: string,
		"shareType"?: string,
		"site"?: string,
		"siteUrl": string,
		"title": string,
		"titleUrl": string,
		"url": string,
		"eventId"?: string,
		"parameter"?: Object
	},footer?:boolean) {
	}

	/**
	 * 分享到朋友圈
	 * @param shareFriends 
	 * @param desc 内容描述
	 * @param imageUrl img的url
	 * @param shareType 分享的类型
	 * @param site 网站名字
	 * @param siteUrl 网站链接
	 * @param title 分享标题
	 * @param titleUrl 标题的url
	 * @param url 本身的链接
	 */
	shareFriends(sharevalue: {
		"desc": string,
		"imageUrl"?: string,
		"shareType"?: string,
		"site"?: string,
		"siteUrl": string,
		"title": string,
		"titleUrl": string,
		"url": string,
		"eventId"?: string,
		"parameter"?: Object
	},footer?:boolean) {
		
	}

	/**
	 * 调用移动端的分享
	 * @param shareFriends 
	 * @param desc 内容描述
	 * @param imageUrl img的url
	 * @param shareType 分享的类型
	 * @param site 网站名字
	 * @param siteUrl 网站链接
	 * @param title 分享标题
	 * @param titleUrl 标题的url
	 * @param url 本身的链接
	 */
	share(sharevalue: {
		"desc": string,
		"imageUrl"?: string,
		"shareType"?: string,
		"site"?: string,
		"siteUrl": string,
		"title": string,
		"titleUrl": string,
		"url": string,
		"eventId"?: string,
		"parameter"?: Object
	},footer?:boolean) {
		
	}


    /**
     * 
     * @param product_id 适当性检测
     * @param risk_score 
     */

	ihanerFSP(product_id: string, risk_score: string) {
	}

	/**
	 * 
	 * @param 跳转
	 */
	baseGoRouter(host: string, param: string | object) {
		
	}

	/**
	 * 
	 * @param stocknSid 股票id
	 */
	gotoStockDetailPage(stocknSid: string) {
	}

	/**
	 * 
	 * @param router跳转战队直播室 
	 * ihayner://homelive:10060?param={"data":"{\"liveRoomType\":0,\"roomId\":\"71314e37e7c790c95af57bcb\",\"serviceId\":\"558a3e9025ea5de341f5203d\",\"type\":0}","defaultParam":"2"}
	 */
	gotoLiveDetailPage(liveType: string, roomId: string, serviceId: string) {

	}


	/**
	 * 
	 * @param router跳转直播列表 
	 */
	gotoLiveListPage() {
	}


	/**
	 * 
	 * @param 跳转banner页 
	 */
	gotoBanner(bannerdata) {
	}

	/**
	 * 跳转首页
	 */
	gotoHome() {
	}

	/**
	 * 跳转交易
	 */
	tradeStock(stock_name: string, stock_code: string, buyorsell: 'buy' | 'sell') {
	}

	/**
	 * 点击放大图片
	 */
	imageClick(img_url) {

	}

	/**
	 * 字体缩放
	 */
	changeBodyFontSize(isshow, callback) {
		
	}


    /**
     * 自选股添加和删除
     * @param stock_method 添加还是删除", （boolean值 默认false 删除）
     * @param stock_code 股票代码
     */
	optional(stock_method: boolean, stock_code: string) {
	}

	/**
	 * 获取埋点头
	 */
	getRequestHead(callback) {
		
	}

	getPayRequestHead(callback) {
		
	}

	/**
	 * 拨打电话
	 */
	callphone(title: string, phone: string) {

	}

	//返回上一级
	goBack() {
	}

	//ios改变状态栏颜色
	statusBarStyle(style) {
		
	}

	gotoapp() {
		
	}

	cangoback(goback) {
	}

	/**
	 * 控制改变toolbar颜色与标题
	 * @param title 
	 * @param color 
	 */
	toolbar(title, color) {
	}

	/**
	 * 通知原生请求失败
	 */
	requestfailed() {
	}

	/**
	 * 
	 * @param user_id 开户
	 * @param url 
	 */
	opAccount(user_id, url) {
	}

	/**
	 * 
	 * @param user_id 交易
	 * @param company_id 
	 */
	trade(user_id, company_id) {
	}

	bindAccount(user_id, company_id) {
	}

	/**
	 * 唤起支付sdk
	 * @param order_id 
	 * @param prepay 
	 * @param paymethod 1是微信，2是支付宝，3线下支付
	 */
	getPayInfo(messageBody: { order_id, prepay, paymethod }, callback) {
		
		
	}

	/**
	 * 直接调起适当性认证
	 */
	startFsp(productId, riskScore) {
		
	}

	/**
	 * 线下支付提示
	 */
	offlinePayAlertMessage() {
	}

	/**
	 * 海纳适当性页面 需要提示用户拨打电话时进行的弹框
	 * @param phone 手机号码
	 * @param content 显示内容
	 * @param title 标题
	 */
	callPhoneAlert(phone:string,content:string,title:string){
	}

	/**
	 * 当购买业务时，如果用户不符合当前产品，弹框提示重新做或者打电话
	 * @param phone 
	 * @param content 
	 * @param title 
	 * @param callback 
	 */
	riskAlert(phone:string,content:string,title:string,callback:Function){
		
	}

	/**
	 * 回调原声通知原声实名认证已经完成
	 * @param name 
	 */
	authSuccess(name:string){
	}

	/**
	 * 回调风险测评成功
	 * @param type_string 类型的名称 例如:稳健性，激进型
	 * @param risk_score 风险测评的分数
	 */
	riskSuccess(type_string:string,risk_score:number){
	}

	/** 通知原声app整个开通流程完毕 */
	confirmationSuccess(){
	}

	/**
	 * 通知原声app适当性中途意外出错
	 * @param err_code 后台返回的错误码
	 * @param err_msg 接口返回的错误描述
	 * @param fsp_type 1实名，2风险，3签署协议
	 */
	fspFailed(err_code:number,err_msg:string,fsp_type:number){
	}

	/** h5红包关闭按钮 */
	closePoup(){
	}

	/**
	 * 调用原生发送验证码
	 * @param phone 手机号
	 */
	sendCodeToH5(phone:string){
	}

	/**
	 * h5通知app快速登录
	 * @param phone  手机号
	 * @param code 验证码
	 */
	hbLogin(phone:string,code:string,callback:Function){
		
	}

	getHomeActivityData(callback:Function){
		
	}
	
	/**
	 * 关闭容器
	 */
	controlFinish(){
	}

	/**
	 * 原生goback,返回上一页，有则返回，没有则关闭容器
	 */
	appBack(){
	}

	/**
	 * ios通知原生支付页面进入支付
	 */
	webPSucceeded(){
	}

}
export default new NativeJs()