//var space_cities = ["石家庄","秦皇岛", "唐山", "保定", "廊坊", "承德", "沧州", "邯郸", "衡水", "邢台", "张家口", "省本部"]

var space_counties = {
	name:{
		"shijiazhuang":{
        "name":"石家庄",
        "counties":[
            "正定县","赵县","赞皇县","元氏县","新乐市","辛集市","无极县","长安区","裕华区","新华区","桥西区","桥东区","开发区","深泽县","平山县","栾城县","鹿泉市","灵寿县","井陉矿区","井陉县","晋州市","行唐县","藁城市","高邑县"
        ]
    },

    "baoding":
    {
        "name":"保定",
        "counties":[
            "涿州市","易县","徐水县","雄县","新市区","望都县","唐县","顺平县","容城县","曲阳县","清苑县","南市区","满城县","蠡县","涞源县","涞水县","高阳县","高碑店市","阜平县","定州市","定兴县","博野县","北市区","安新县","安国市","开发区","白沟县"
        ]
    },

    "cangzhou":
    {
        "name":"沧州",
        "counties":[
            "盐山县","献县","吴桥县","肃宁县","任丘市","青县","南皮县","孟村回族自治县","黄骅市","河间市","海兴县","东光县","沧州市","沧县","泊头市","新华区","运河区","开发区","沧州","渤海新区"
        ]
    },

    "chengde":
    {
        "name":"承德",
        "counties":[
            "鹰手营子矿区","兴隆县","围场满族蒙古族自治县","双桥区","双滦区","平泉县","滦平县","隆化县","宽城满族自治县","丰宁满族自治县","承德县"
        ]
    },

    "handan":
    {
        "name":"邯郸",
        "counties":[
            "永年县","武安市","魏县","涉县","曲周县","邱县","临漳县","鸡泽县","邯山区","邯郸县","广平县","复兴区","峰峰矿区","肥乡县","大名县","丛台区","磁县","成安县","开发区","邯郸市","馆陶县"
        ]
    },

    "hengshui":
    {
        "name":"衡水",
        "counties":[
            "枣强县","武邑县","武强县","桃城区","深州市","饶阳县","景县","冀州市","故城县","阜城县","安平县","衡水市"
        ]
    },

    "langfang":
    {
        "name":"廊坊",
        "counties":[
            "永清县","香河县","文安县","三河市","开发区","广阳区","固安县","大城县","大厂回族自治县","霸州市","安次区","廊坊燕郊","廊坊市营","廊坊郊区"
        ]
    },

    "qinhuangdao":
    {
        "name":"秦皇岛",
        "counties":[
            "山海关区","青龙满族自治县","卢龙县","海港区","抚宁县","昌黎县","北戴河区","开发区","秦皇岛市"
        ]
    },

    "tangshan":
    {
        "name":"唐山",
        "counties":[
            "遵化市","玉田县","曹妃甸","唐山市","迁西县","迁安市","滦县","滦南县","乐亭县","开平区","京唐港","古冶区","丰润区","丰南区","曹新区","路北区","路南区","高新区"
        ]
    },

    "xingtai":
    {
        "name":"邢台",
        "counties":[
            "邢台市","邢台县","新河县","威县","沙河市","任县","清河县","平乡县","宁晋县","内丘县","南和县","南宫市","隆尧县","临西县","临城县","巨鹿县","广宗县","柏乡县","桥东区","桥西区","经济开发区","大曹庄管理区"
        ]
    },

    "zhangjiakou":
    {
        "name":"张家口",
        "counties":[
            "张家口市","涿鹿县","张北县","阳原县","宣化区","下花园区","蔚县","万全县","尚义县","桥西区","桥东区","康保县","怀来县","怀安县","沽源县","崇礼县","赤城县","高新区","宣化县","察北管理区","塞北管理区"
        ]
    },

    "shengbenbu":
    {
        "name":"省本部",
        "countiew":[
            "省本部"
        ]
    }

	}
};
console.log(space_counties);

var dict_type_list = {
    "TYPE_BUILDSITE":{
        "name":"站点类型",
        "values":["核心生产楼","汇聚站点","接入站点","用户站点","其他"]
    },
    "TYPE_TRANSLEVEL":{
        "name":"传输业务级别",
        "values":["省际","省内","省内+本地","本地骨干","本地汇聚","本地接入","其他"]
    },
    "TYPE_EQUIPMENTROOM":{
        "name":"机房类型",
        "values":["交换机房","数据机房","动力机房","传输机房","无线机房","综合机房","其他","用户机房","接入网机房","接入机房"]
    },
    "TYPE_BUILDSITE_IMP_LEVEL":{
        "name":"机楼外电基站重要级别",
        "values":["VIP基站","VVIP基站","超级基站","传输机房","传输节点","非通信机楼","节点基站","节点机房","普通基站","通信机楼","综合机楼"]
    },
    "TYPE_BUILDSITE_PROP":{
        "name":"机楼外电产权属性",
        "values":["自建","共建","共享","购买","其他","自购","租用"]
    },
    "TYPE_SITE_BASE":{
        "name":"机房基站类型",
        "values":["传输节点","基站","机房","其他"]
    },
    "TYPE_DEV_TYPE":{
        "name":"物理资源设备类型",
        "values":["高压配电","低压配电","发电机组","开关电源系统","UPS系统 ","列头柜","专用空调","中央空调","普通空调","节能设备","动环监控采集","图像系统","LSC系统","CSC系统","交流配电系统","开关电源系统","变换设备","UPS系统","普通空调","节能设备","新能源设备","极早期烟感","动环监控采集","防雷接地系统","车载油机","小油机","车载电池","其他"]
    },
    "TYPE_DEV_USE_STATUS":{
        "name":"物理资源使用状态",
        "values":["工程","空闲","空载","退网","闲置-故障","闲置-良好","现网","预留","在建","在用","在用-故障","在用-良好"]
    },
    "TYPE_DEV_SUBTYPE_TRANSFORMER":{
        "name":"变压器/调压器",
        "values":["变压器","调压器"]
    },
    "TYPE_DEV_SUBTYPE_HIGHCAB":{
        "name":"高压配电柜设备子类",
        "values":["PT柜","避雷器柜","操作电源","出线柜","隔离柜","户外高压开关","计量柜","进线柜","进线兼计量柜","母联柜","其他","升高柜","压变柜","远程控制屏"]
    },
    "TYPE_DEV_SUBTYPE_LOWCAB":{
        "name":"低压配电柜设备子类",
        "value":["出线柜","电容补偿柜","计量柜","交流配电柜","进线柜","进线计量柜","联络柜","市电油机转换柜","谐波滤波机柜","应急油机接入屏"]
    },
    "TYPE_DEV_SUBTYPE_GENERATOR":{
        "name":"发电机组设备子类",
        "value":["固定发电机组","固定油机"]
    },
    "TYPE_DEV_SUBTYPE_ACCAB":{
        "name":"交流配电柜设备子类",
        "value":["UPS配电柜","交流配电箱","开关电源配电柜","空调配电柜列头柜","楼层分配电柜","其他"]
    },
    "TYPE_DEV_SUBTYPE_DCCAB":{
        "name":"直流配电柜设备子类",
        "value":[]
    },
    "TYPE_DEV_SUBTYPE_SWITCH":{
        "name":"开关电源设备子类",
        "value":["其他","整流器柜","组合开关电源"]
    },
    "TYPE_DEV_SUBTYPE_UPS":{
        "name":"UPS主机设备子类",
        "value":["UPS主机"]
    },
    "TYPE_DEV_SUBTYPE_BATTERY":{
        "name":"蓄电池组设备子类",
        "value":["UPS电池组","基础电池组"]
    },
    "TYPE_DEV_SUBTYPE_DEDIAIRC":{
        "name":"专用空调设备子类",
        "value":["专用空调（风冷）","专用空调（通冷冻水型）"]
    },
    "TYPE_DEV_SUBTYPE_BIFURCATION":{
        "name":"动环专业内输出分路",
        "value":["开关","熔丝"]
    },
    "TYPE_ORIENT":{
        "name":"方向",
        "value":["东西","西东","南北","北南"]
    },
    "TYPE_POWER_IMPORT":{
        "name":"市电引入方式",
        "value":["地埋","架空","楼内"]
    },
    "TYPE_POWER_SUPPLY":{
        "name":"供电性质",
        "value":["转供","直供"]
    },
    "TYPE_TRANSFORMER_WORK_TYPE":{
        "name":"变压器或调压器",
        "value":["转供","直供"]
    },
    "TYPE_GENERATOR_STARTUP":{
        "name":"启动方式",
        "value":["自动启动","手动启动"]
    },
    "TYPE_GENERATOR_COOL":{
        "name":"冷却方式",
        "value":["风冷","水冷"]
    },
    "TYPE_BIFURCATION_MAINBACK":{
        "name":"主备状态",
        "value":["主用","备用"]
    },
    "TYPE_BIFURCATION_POLE":{
        "name":"端子级数",
        "value":["三相","单相"]
    },
    "TYPE_BIFURCATION_DCAC":{
        "name":"交直流方式",
        "value":["直流","交流"]
    },
    "TYPE_BIFURCATION_RATE_VOLTAGE":{
        "name":"额定电压",
        "value":["-47","-48","0","220","220V-380V","250","380","381","400","50","660","690","960","无"]
    }

}

/*

//----TYPE包括
//  TYPE_BUILDSITE  站点类型，值为 核心生产楼、汇聚站点、接入站点、用户站点、其他
//  TYPE_TRANSLEVEL  传输业务级别 省际、省内、省内+本地、本地骨干、本地汇聚、本地接入、其他
//  TYPE_EQUIPMENTROOM 机房类型  交换机房、数据机房、动力机房、传输机房、无线机房、综合机房、其他、用户机房、接入网机房、接入机房
//  TYPE_BUILDSITE_IMP_LEVEL 机楼外电基站重要级别 (VIP基站、VVIP基站、超级基站、传输机房、传输节点、非通信机楼、节点基站、节点机房、普通基站、通信机楼、综合机楼)
//  TYPE_BUILDSITE_PROP 机楼外电产权属性 (自建、共建、共享、购买、其他、自购、租用)
//  TYPE_SITE_BASE 机房基站类型
//  TYPE_DEV_TYPE 物理资源设备类型
//  TYPE_DEV_USE_STATUS 物理资源使用状态 (工程、空闲、空载、退网、闲置-故障、闲置-良好、现网、预留、在建、在用、在用-故障、在用-良好)
//  TYPE_DEV_SUBTYPE_TRANSFORMER 变压器/调压器
//  TYPE_DEV_SUBTYPE_HIGHCAB 高压配电柜设备子类
//  TYPE_DEV_SUBTYPE_LOWCAB 低压配电柜设备子类
//  TYPE_DEV_SUBTYPE_GENERATOR 发电机组设备子类
//  TYPE_DEV_SUBTYPE_DCCAB 直流配电柜设备子类
//  TYPE_DEV_SUBTYPE_ACCAB 交流配电柜设备子类
//  TYPE_DEV_SUBTYPE_SWITCH 开关电源设备子类
//  TYPE_DEV_SUBTYPE_UPS UPS主机设备子类
//  TYPE_DEV_SUBTYPE_BATTERY 蓄电池组设备子类
//  TYPE_DEV_SUBTYPE_DEDIAIRC 专用空调设备子类
//  TYPE_DEV_SUBTYPE_BIFURCATION 动环专业内输出分路
//  TYPE_ORIENT 方向 1东西2西东3南北4北南
//  TYPE_POWER_IMPORT 市电引入方式(地埋、架空、楼内)
//  TYPE_POWER_SUPPLY 供电性质(转供、直供)
//  TYPE_TRANSFORMER_WORK_TYPE  干式,油浸式
//  TYPE_GENERATOR_STARTUP  启动方式(自动启动，手动启动)
//  TYPE_GENERATOR_COOL  冷却方式(风冷，水冷)

//  TYPE_BIFURCATION_MAINBACK 主备状态
//  TYPE_BIFURCATION_POLE 端子级数
//  TYPE_BIFURCATION_DCAC 交直流方式
//  TYPE_BIFURCATION_RATE_VOLTAGE 额定电压

*/