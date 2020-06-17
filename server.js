var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//Database Component
var sql = require("mssql");
app.use(bodyParser.urlencoded({ extended: false }));
var md5 = require('md5');
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
//support URL - encode body
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.send('<h1> Hello Node Server React Native</h1>');
});
var address, os = require('os'), ifaces = os.networkInterfaces();
for (var dev in ifaces) {
    var iface = ifaces[dev].filter(function (details) {
        return details.family === 'IPv4' && details.internal === false;
    });
    if (iface.length > 0) address = iface[0].address;
}
console.log(address);
//Config connection
const config = {
    user: 'hung',
    password: '1',
    server: address,
    database: 'QuanLyQuanAn',
    port: 1433,
    "pool": {
        "max": 10,
        "min": 0,
        "idleTimeoutMillis": 30000
    },
    "options": {
    "encrypt": false,
    "enableArithAbort": true
    }
}
// const config = {
//     user: 'kimhungcv',
//     password: 'kimhung1',
//     server: '172.31.98.67',
//     database: 'QuanLyQuanAn',
//     port: 1433,
// }
app.get('/login/', function (req, res) {
  const username = req.query.TenDN;
  const password = req.query.MatKhau;
  //console.log(username+"/"+password);
  const str = md5(password).substr(0,15);
  (async function () {
      try {
        //console.log("sql connecting......")
        let pool = await sql.connect(config)
        let result = await pool.request()
          .query("select *from TAIKHOAN where TenDN='"+username+"' and MatKhau='"+str+"'")  ;
        res.send(result.recordset);
      } catch (err) {
        //console.log(err);
      }
    })()
})
app.get('/users', function (req, res) {
    (async function () {
        try {
          //console.log("sql connecting......")
          let pool = await sql.connect(config)
          let result = await pool.request()
            .query('Select MaMon,TenMon,DVT,DonGia,HinhAnh from ThucDon')  // subject is my database table name
          //console.log(result.recordset )
          res.send(result.recordset);
        } catch (err) {
          //console.log(err);
        }
      })()
})
app.get('/getcount', function (req, res) {
  (async function () {
      try {
        //console.log("sql connecting......")
        let pool = await sql.connect(config)
        let result = await pool.request()
          .query('select count (MaHoaDon) as SL from HDON')  // subject is my database table name
        //console.log(result.recordset )
        res.send(result.recordset);
      } catch (err) {
        //console.log(err);
      }
    })()
})
app.get('/food/', function (req, res) {
    const id = req.query.MaLoai;
    (async function () {
        try {
          //console.log("sql connecting......")
          let pool = await sql.connect(config)
          let result = await pool.request()
            .query("Select * From  THUCDON where MaLoai = '" + id + "'")  // subject is my database table name
          //console.log(result.recordset )
          res.send(result.recordset);
        } catch (err) {
          //console.log(err);
        }
      })()
})
app.get('/typefood', function (req, res) {
    (async function () {
        try {
          //console.log("sql connecting......")
          let pool = await sql.connect(config)
          let result = await pool.request()
            .query('Select * from LoaiMon')  // subject is my database table name
          //console.log(result.recordset )
          res.send(result.recordset);
        } catch (err) {
          //console.log(err);
        }
      })()
})
app.get('/location/', function (req, res) {
    const id = req.query.MaKV;
    (async function () {
        try {
          //console.log("sql connecting......")
          let pool = await sql.connect(config)
          let result = await pool.request()
            .query("Select BAN.MaBan,BAN.TenBan,BAN.SoChoNgoi,KHUVUC.MaKV,KHUVUC.TenKV,BAN.TrangThai " +
            "from KHUVUC,BAN where KHUVUC.MaKV = BAN.MaKV and KHUVUC.MaKV='" + id + "'");  // subject is my database table name
          //console.log(result.recordset )
          res.send(result.recordset);
        } catch (err) {
          //console.log(err);
        }
      })()
})
app.get('/floor', function (req, res) {
    (async function () {
        try {
          //console.log("sql connecting......")
          let pool = await sql.connect(config)
          let result = await pool.request()
            .query("Select * From KHUVUC");  // subject is my database table name
          //console.log(result.recordset )
          res.send(result.recordset);
        } catch (err) {
          //console.log(err);
        }
      })()
})
app.get('/bill/', function (req, res) {
    const MaBan = req.query.MaBan;
    (async function () {
        try {
          //console.log("sql connecting......")
          let pool = await sql.connect(config)
          let result = await pool.request()
            .query("Select CHITIETHDON.MaMon,THUCDON.TenMon,CHITIETHDON.SoLuong,(CHITIETHDON.SoLuong*THUCDON.DonGia) as " +
            "ThanhTien,BILL.MaHoaDon " +
            "From CHITIETHDON,THUCDON,(Select DISTINCT HDON.MaHoaDon from HDON Where HDON.MaBan='"+MaBan+"' and HDON.TongTien=0 ) as BILL " +
            "Where CHITIETHDON.MaMon=THUCDON.MaMon and BILL.MaHoaDon=CHITIETHDON.MaHoaDon ");  // subject is my database table name
          //console.log(result.recordset )
          res.send(result.recordset);
        } catch (err) {
          //console.log(err);
        }
      })()
    
})
app.get('/hd/', function (req, res) {
    ////console.log(req.query.MaKV);
    const id = req.query.MaBan;
    (async function () {
        try {
          //console.log("sql connecting......")
          let pool = await sql.connect(config)
          let result = await pool.request()
            .query("Select DISTINCT HOADON.MaHoaDon from HOADON, BAN where HOADON.MaBan = BAN.MaBan and Ban.MaBan='" + id + "'");  // subject is my database table name
          //console.log(result.recordset )
          res.send(result.recordset);
        } catch (err) {
          //console.log(err);
        }
      })()
})
app.put('/addfoodtobill/', function (req, res) {
    ////console.log(req.query.MaKV);
    const MaMon = req.query.MaMon;
    const MaHD = req.query.MaHoaDon;
    const DonGia = req.query.DonGia;
    const id = req.query.MaBan;
    (async function () {
        try {
          //console.log("sql connecting......")
          let pool = await sql.connect(config)
          let result = await pool.request()
            .query("INSERT INTO CHITIETHDON(MaHoaDon,MaMon,SoLuong,DonGia,ThanhTien)"+
            " VALUES ('"+MaHD+"','"+MaMon+"',1,"+DonGia+","+DonGia+")");  // subject is my database table name
          //console.log(result.recordset )
          res.send(result.recordset);
        } catch (err) {
          //console.log(err);
        }
      })()
  
})
app.put('/updatebilladd/', function (req, res) {
    ////console.log(req.query.MaKV);
    const MaHD = req.query.MaHoaDon;
    const MaMon = req.query.MaMon;
    (async function () {
        try {
          //console.log("sql connecting......")
          let pool = await sql.connect(config)
          let result = await pool.request()
            .query("Update CHITIETHDON SET MaHoaDon = MaHoaDon, MaMon = MaMon,SoLuong=SoLuong+1,DonGia=DonGia,ThanhTien=(ThanhTien+DonGia) " +
            "WHERE MaHoaDon='" + MaHD + "' and MaMon='" + MaMon + "'");  // subject is my database table name
          //console.log(result.recordset )
          res.send(result.recordset);
        } catch (err) {
          //console.log(err);
        }
      })()
})
app.put('/removefood/', function (req, res) {
    const MaHD = req.query.MaHoaDon;
    const MaMon = req.query.MaMon;
    (async function () {
        try {
          //console.log("sql connecting......")
          let pool = await sql.connect(config)
          let result = await pool.request()
            .query("DELETE FROM CHITIETHDON WHERE MaHoaDon='"+MaHD+"' and MaMon='"+MaMon+"'");  // subject is my database table name
          //console.log(result.recordset )
          res.send(result.recordset);
        } catch (err) {
          //console.log(err);
        }
      })()
})
app.put('/updatebillsub/', function (req, res) {
    const MaHD = req.query.MaHoaDon;
    const MaMon = req.query.MaMon;
    (async function () {
        try {
          //console.log("sql connecting......")
          let pool = await sql.connect(config)
          let result = await pool.request()
            .query("Update CHITIETHDON SET MaHoaDon = MaHoaDon, MaMon = MaMon,SoLuong=SoLuong-1,DonGia=DonGia,ThanhTien=(ThanhTien-DonGia) " +
            "WHERE MaHoaDon='" + MaHD + "' and MaMon='" + MaMon + "'");  // subject is my database table name
          //console.log(result.recordset )
          res.send(result.recordset);
        } catch (err) {
          //console.log(err);
        }
      })()
})
app.get('/checkfood/', function (req, res) {
    ////console.log(req.query.MaKV);
    const MaHD = req.query.MaHoaDon;
    const MaMon = req.query.MaMon;
    (async function () {
        try {
          //console.log("sql connecting......")
          let pool = await sql.connect(config)
          let result = await pool.request()
            .query("select MaHoaDon,MaMon from CHITIETHDON where MaHoaDon='"+MaHD+"' and MaMon='"+MaMon+"'"); 
          res.send(result.recordset);
        } catch (err) {
          //console.log(err);
        }
      })()
})
app.put('/changestatus/', function (req, res) {
    const MaBan = req.query.MaBan;
    (async function () {
        try {
          //console.log("sql connecting......")
          let pool = await sql.connect(config)
          let result = await pool.request()
            .query("Update BAN SET MaBan = MaBan, TenBan = TenBan,SoChoNgoi=SoChoNgoi,MaKV=MaKV,TrangThai='1' where MaBan = '"+MaBan+"'");  // subject is my database table name
          //console.log(result.recordset )
          res.send(result.recordset);
        } catch (err) {
          //console.log(err);
        }
      })()
});

app.get('/getMaHD/', function (req, res) {
    const MaBan = req.query.MaBan;
    (async function () {
        try {
          //console.log("sql connecting......")
          let pool = await sql.connect(config)
          let result = await pool.request()
            .query("select MaHoaDon from HDON where MaBan = '"+MaBan+"' and TongTien=0");  // subject is my database table name
         // //console.log(result.recordset )
          res.send(result.recordset);
        } catch (err) {
          //console.log(err);
        }
      })()
})

app.put('/addbill/', function (req, res) {
  const MaBan = req.query.MaBan;
  (async function () {
      try {
        //console.log("sql connecting......")
        let pool = await sql.connect(config)
        let result = await pool.request()
          .query("insert into HDON values ( "+
          "(select MAX(MaHoaDon)+1 from HDON), CONVERT (date, GETDATE()),'"+MaBan+"','NV1','Không','KH1',0)");  // subject is my database table name
       // //console.log(result.recordset )
        res.send(result.recordset);
      } catch (err) {
        //console.log(err);
      }
    })()
});
app.put('/addbillnull/', function (req, res) {
  const MaBan = req.query.MaBan;
  (async function () {
      try {
        let pool = await sql.connect(config)
        let result = await pool.request()
          .query("insert into HDON values ( "+
          "'1', CONVERT (date, GETDATE()),'"+MaBan+"','NV1','Không','KH1',0)");
        res.send(result.recordset);
      } catch (err) {
      }
    })()
});
app.put('/canceltable/', function (req, res) {
    const MaHoaDon = req.query.MaHoaDon;
    (async function () {
        try {
          //console.log("sql connecting......")
          let pool = await sql.connect(config)
          let result = await pool.request()
            .query("delete from HDON where MaHoaDon = "+MaHoaDon+" ;delete from CHITIETHDON where MaHoaDon = "+MaHoaDon);  // subject is my database table name
          ////console.log(result.recordset )
          res.send(result.recordset);
        } catch (err) {
          //console.log(err);
        }
      })()
});
app.put('/resettable/', function (req, res) {
    const MaBan = req.query.MaBan;
    (async function () {
        try {
          //console.log("sql connecting......")
          let pool = await sql.connect(config)
          let result = await pool.request()
            .query("Update BAN SET MaBan = MaBan, TenBan = TenBan,SoChoNgoi=SoChoNgoi,MaKV=MaKV,TrangThai='0' where MaBan = '"+MaBan+"'");  // subject is my database table name
          ////console.log(result.recordset )
          res.send(result.recordset);
        } catch (err) {
          //console.log(err);
        }
      })()
});
app.get('/checktrangthai/', function (req, res) {
  const MaBan = req.query.MaBan;
  (async function () {
      try {
        let pool = await sql.connect(config)
        let result = await pool.request()
          .query("select TrangThai from BAN where MaBan='"+MaBan+"'");
        ////console.log(result.recordset )
        res.send(result.recordset);
      } catch (err) {
        //console.log(err);
      }
    })()
});
app.get('/checknl/', function (req, res) {
  const MaMon = req.query.MaMon;
 // const MaHD = req.query.MaHD;
  (async function () {
      try {
        let pool = await sql.connect(config)
        let result = await pool.request()
          .query("select Min (A.SoLuongSP) as SLMin "+
          "from (select NGUYENLIEU.MaNL,(NGUYENLIEU.SoLuong/CONGTHUC.HamLuong) as SoLuongSP "+
          "from NGUYENLIEU,CONGTHUC "+
          "where CONGTHUC.MaNL = NGUYENLIEU.MaNL and CONGTHUC.MaMon = '"+MaMon+"') as  A");
        ////console.log(result.recordset )
        res.send(result.recordset);
      } catch (err) {
        //console.log(err);
      }
    })()
});
app.put('/updateNLAdd/', function (req, res) {
  const MaMon = req.query.MaMon;
  (async function () {
      try {
        let pool = await sql.connect(config)
        let result = await pool.request()
          .query("update NGUYENLIEU set SoLuong = SoLuong - A.HamLuong "+
          "from (select MaNL,HamLuong from CONGTHUC where MaMon ='"+MaMon+"')as A "+
          "where NGUYENLIEU.MaNL = A.MaNL ");
        ////console.log(result.recordset )
        res.send(result.recordset);
      } catch (err) {
        //console.log(err);
      }
    })()
});
app.put('/updateNLSub/', function (req, res) {
  const MaMon = req.query.MaMon;
  let SoLuong = req.query.SoLuong;
  (async function () {
      try {
        let pool = await sql.connect(config)
        let result = await pool.request()
          .query("update NGUYENLIEU set SoLuong = SoLuong + A.HamLuong*"+SoLuong+
          " from (select MaNL,HamLuong from CONGTHUC where MaMon ='"+MaMon+"')as A "+
          "where NGUYENLIEU.MaNL = A.MaNL ");
        ////console.log(result.recordset )
        res.send(result.recordset);
      } catch (err) {
        //console.log(err);
      }
    })()
});

app.put('/addbillnull/', function (req, res) {
  const MaBan = req.query.MaBan;
  (async function () {
      try {
        //console.log("sql connecting......")
        let pool = await sql.connect(config)
        let result = await pool.request()
          .query("insert into HDON values ('1', CONVERT (date, GETDATE()),'"+MaBan+"','NV1','Không','KH1',0)"); 
        res.send(result.recordset);
      } catch (err) {
        //console.log(err);
      }
    })()
});
const server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    //console.log('server start at' + host)
})