const mysql = require("mysql");
const { connect } = require("../routes/restro");
// const { search } = require("../routes/restro");




const pool = mysql.createPool({
  connectionLimit: 200,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

exports.login =(req, res)=>{
    pool.getConnection((error, connection) => {
        if (error) {
          console.log("connection failed");
        } else {
          console.log("connection is built");
        }
    connection.query('select *from   staff', (err, rows)=>{
        connection.release();
        if(!err){
            res.render("loginPage", {rows});
            console.log("the data from the customer table", rows)
        }else{
            console.log(err)
        }
    })
})
}

exports.home =(req, res)=>{
    const {staff_id, staff_password} =req.body
    pool.getConnection((error, connection)=>{
        if(error){
            console.log("connection failed")
        }else{
            console.log("connection built")
        }
        if(staff_id=="" || staff_password==""){
            console.log("directly entering")
        }
        connection.query('select *from staff where staff_id = ? and staff_password= ?', [staff_id, staff_password], (err, rows)=>{
            if(!err){
                console.log(rows)
                if(rows.length ==0){
                    res.render("error")
                    console.log(req.body.staff_id)
                    console.log(req.body.staff_password)
                }else{
                    res.render('homePage')
                }
             
              
            }else{
                console.log("something went wrong")
            }
        })
        connection.release()
    })
}


exports.homepage =(req, res)=>{
    res.render('homePage')
   
}

exports.menu =(req, res)=>{
    pool.getConnection((error, connection) => {
        if (error) {
          console.log("connection failed");
        } else {
          console.log("connection is built");
        }
    connection.query('select *from   menu', (err, rows)=>{
        connection.release();
        if(!err){
            res.render("menuPage", {rows});
            console.log("the data from the customer table", rows)
        }else{
            console.log(err)
        }
    })
})
}


// edit menu
exports.editmenu= (req, res) => {
    pool.getConnection((error, connection) => {
      if (error) {
        console.log("connection failed");
      } else {
        console.log("connection is built");
      }
      //    use the connection
      connection.query(
        "select *from  menu where food_id= ?",
        [req.params.food_id],
        (err, rows) => {
          // when done with the connection release it
          connection.release();
          if (!err) {
            res.render("editmenuitem", { rows });
            console.log("the data from the table", rows);
          } else {
            console.log(err);
          }
        }
      );
    });
  };

  
// update menu
exports.update = (req, res) => {
    pool.getConnection((error, connection) => {
      if (error) {
        console.log("connection failed");
      } else {
        console.log("connection is built");
      }
      const { food_id, food_name, food_price, food_type, food_description , food_quantity} = req.body;
      //    use the connection
      connection.query(
        "update menu set food_id =?, food_name=?, food_price =?, food_type =? ,food_description= ? , food_quantity=? where food_id= ? ",
        [food_id, food_name, food_price, food_type, food_description, food_quantity, [req.params.food_id]],
        (err, rows) => {
          // when done with the connection release it
          connection.release();
          if (!err) {
            pool.getConnection((error, connection) => {
              if (error) {
                console.log("connection failed");
              } else {
                console.log("connection is built");
              }
              //    use the connection
              connection.query(
                "select *from  menu where food_id= ?",
                [req.params.food_id],
                (err, rows) => {
                  // when done with the connection release it
                  connection.release();
                  if (!err) {
                    res.render("editmenuitem", {
                      rows,
                      alert: "updation successful",
                    });
                    console.log("the data from the table", rows);
                  } else {
                    console.log(err);
                  }
                }
              );
            });
          } else {
            console.log(err);
          }
        }
      );
    });
  };



  //delete menu item
exports.delete = (req, res) => {
    pool.getConnection((error, connection) => {
      if (error) {
        console.log("connection failed");
      } else {
        console.log("connection is built");
      }
      //    use the connection
      connection.query(
        "delete from  menu where food_id= ?",
        [req.params.food_id],
        (err, rows) => {
          // when done with the connection release it
          connection.release();
          if (!err) {
            res.redirect("/menupage");
            console.log("the data from the table", rows);
          } else {
            console.log(err);
          }
        }
      );
    });
  };
  

  exports.additem = (req, res) => {
    res.render("addmenuitem");
  };
  
  
exports.postitems = (req, res) => {
    const { food_id, food_name, food_price, food_type, food_description , food_quantity} = req.body;
    pool.getConnection((error, connection) => {
      if (error) {
        console.log("connection failed");
      } else {
        console.log("connection is built");
      }
      //    use the connection
      // let searchTerm = req.body.search;
      connection.query(
        "insert into menu set food_id =?, food_name=?, food_price =?, food_type =? ,food_description= ? , food_quantity=? ",
        [food_id, food_name, food_price, food_type, food_description, food_quantity],
        (err, rows) => {
          // when done with the connection release it
          connection.release();
          if (!err) {
            res.render("addmenuitem", { alert: "User added successfully." });
            console.log("the data from the table", rows);
          } else {
            console.log(err);
          }
        }
      );
    });
  };

 
exports.postitems = (req, res) => {
    const { food_id, food_name, food_price, food_type, food_description , food_quantity} = req.body;
    pool.getConnection((error, connection) => {
      if (error) {
        console.log("connection failed");
      } else {
        console.log("connection is built");
      }
      //    use the connection
      // let searchTerm = req.body.search;
      connection.query(
        "insert into menu set food_id =?, food_name=?, food_price =?, food_type =? ,food_description= ? , food_quantity=? ",
        [food_id, food_name, food_price, food_type, food_description, food_quantity],
        (err, rows) => {
          // when done with the connection release it
          connection.release();
          if (!err) {
            res.render("addmenuitem", { alert: "User added successfully." });
            console.log("the data from the table", rows);
          } else {
            console.log(err);
          }
        }
      );
    });
  };


  exports.order= (req, res) => {
    pool.getConnection((error, connection) => {
      if (error) {
        console.log("connection failed");
      } else {
        console.log("connection is built");
      }
      //    use the connection
      connection.query(
       "select food_id, food_price from menu where food_id=? and food_price =?",[   [req.params.food_id],   [req.params.food_price]],
        (err, rows) => {
          // when done with the connection release it
          connection.release();
          if (!err) {
            res.render("orderdetails", { rows });
            console.log("order details", rows);
          } else {
            console.log(err);
          }
        }
      );
    });
  };

  
  
exports.postorder = (req, res) => {
    let { cust_id, food_id, total_price, no_of_food_items} = req.body;
    total_price= +total_price*no_of_food_items
    pool.getConnection((error, connection) => {
      if (error) {
        console.log("connection failed");
      } else {
        console.log("connection is built");
      }
      connection.query(
        "insert into order_details set cust_id =?, food_id=?, total_price =?, no_of_food_items =?  ",
        [cust_id, food_id, total_price , no_of_food_items],
        (err, rows) => {
          // when done with the connection release it
          if (!err) {
            connection.query('select *from   menu', (err, rows)=>{
              connection.release();
              if(!err){
                  res.render("menuPage", {rows});
                  console.log("the data from the customer table", rows)
              }else{
                  console.log(err)
              }
          })
        
          } else {
            console.log(err);
          }
        }
      );
    });
  };


  exports.orderspage =(req, res)=>{
    pool.getConnection((error, connection) => {
        if (error) {
          console.log("connection failed");
        } else {
          console.log("connection is built");
        }
    connection.query('select *from   orders', (err, rows)=>{
        connection.release();
        if(!err){
            res.render("orderspage", {rows});
            console.log("the data from the customer table", rows)
        }else{
            console.log(err)
        }
    })
})
}


exports.odetails= (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) {
      console.log("connection failed");
    } else {
      console.log("connection is built");
    }
    //    use the connection
    connection.query(
      "select *from  order_details  ",
      (err, rows) => {
        // when done with the connection release it
        connection.release();
        if (!err) {
          res.render("o-details", { rows });
          console.log("the data from the table", rows);
        } else {
          console.log(err);
        }
      }
    );
  });
};

exports.selectedodetails= (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) {
      console.log("connection failed");
    } else {
      console.log("connection is built");
    }
    //    use the connection
    const {cust_id}=req.body;
    connection.query(
      "select *from  order_details  where cust_id =?",[cust_id],
      (err, rows) => {
        // when done with the connection release it
       
        // connection.release();
        if(!err){
          connection.query(
            "select SUM(total_price) as total_price from order_details where cust_id =?",[cust_id],(err, row)=>{
              connection.release();
              if(err){console.log("error at cal sum")}else{
      
        let total =JSON.parse(JSON.stringify(row))
        let total_bill =total[0].total_price
        // console.log('is this working', total);
        // console.log(total[0].total_price)

                  connection.query(
                  "insert into orders set cust_id =?,total_bill=? ",
        [cust_id,total_bill ], (err, orders)=>{
          if(err){
            console.log("unable to insert the data into orders")
          }else{
            console.log("you have successfully inserted the data into orders")
          }
        }
                )


              res.render("o-details", { rows, row});
          console.log("the data from the table", rows, row);
              }
            }
          )
        } 
        else {
          console.log(err);
        }
      })
      
     })
    
 
};




exports.ordersodetails= (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) {
      console.log("connection failed");
    } else {
      console.log("connection is built");
    }
    //    use the connection
    connection.query(
     "select *from order_details where cust_id =?",[[req.params.cust_id]],
      (err, rows) => {
        // when done with the connection release it
        connection.release();
        if (!err) {
          res.render("vieworderdetails", { rows });
          console.log("order details", rows);
        } else {
          console.log(err);
        }
      }
    );
  });
};


exports.payment =(req, res)=>{
  pool.getConnection((error, connection)=>{
      if(error){
          console.log("connection failed")
      }else{
          console.log("connection built")
      }
      connection.query('select *from payment ', (err, rows)=>{
        connection.release()
          if(!err){
            // paymentPage
                  res.render('paymentPage', {rows})
          }else{
              console.log("something went wrong")
          }
      })
  })
}



exports.readytopay= (req, res) => {
  let total_price=[req.params.total_price]

  console.log(total_price)
          res.render("paymentdetails", { rows: total_price });
        
        
  }




exports.paymentdone = (req, res) => {
var currentdate = new Date();
var date=  currentdate.getDate() + "/" +(parseInt(currentdate.getMonth())+1)
+ "/" + currentdate.getFullYear();
var time = currentdate.getHours() + ":" 
+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
  let { cust_id, total_price, mode_of_payment, cust_rating, cust_phone} = req.body;
  pool.getConnection((error, connection) => {
    if (error) {
      console.log("connection failed");
    } else {
      console.log("connection is built");
    }
    connection.query(
      "insert into payment set cust_id =?, total_price=?, mode_of_payment =?, time =?, date=? ",
      [cust_id, total_price, mode_of_payment, time, date],
      (err, rows) => {
        if (!err) {
          connection.query('select *from payment ', (err, rows)=>{
              if(!err){
                connection.query("insert into customer set cust_id=?, cust_phone=?, cust_rating=?",[cust_id, cust_phone, cust_rating], (err, something)=>{
                  connection.release()
                  if(err){
                    console.log("unable to insert the data into customer table")
                  }else{
                    console.log("data is inserted into customers")
                  }
                  res.render('paymentPage', {rows})
                })
              }
                  else{
                  console.log("something went wrong")
              }
             } ) 
        }
        else {
          console.log(err);
        }
      }
    );
  });
};



exports.staffpage =(req, res)=>{
  pool.getConnection((error, connection) => {
    if (error) {
      console.log("connection failed");
    } else {
      console.log("connection is built");
    }
    connection.query('select *from staff ' , (err, rows)=>{
      if(!err){
        res.render('staffpage', {rows})
      }else{
        console.log("unable to load staff page")
      }})

})}



exports.form = (req, res) => {
  res.render("addstaff");
};


exports.create = (req, res) => {
  const { staff_id, staff_phone, staff_name, staff_resignation, staff_password } = req.body;
  pool.getConnection((error, connection) => {
    if (error) {
      console.log("connection failed");
    } else {
      console.log("connection is built");
    }
    //    use the connection
    // let searchTerm = req.body.search;
    connection.query(
      "insert into staff set staff_id=?, staff_phone=?, staff_name=?, staff_resignation=?, staff_password = ?",
      [staff_id,staff_phone,  staff_name, staff_resignation,staff_password],
      (err, rows) => {
        // when done with the connection release it
        connection.release();
        if (!err) {
          res.render("addstaff", { alert: "User added successfully." });
          console.log("the data from the table", rows);
        } else {
          console.log(err);
        }
      }
    );
  });
};

exports.editstaff =(req, res)=>{
  pool.getConnection((error, connection) => {
    if (error) {
      console.log("connection failed");
    } else {
      console.log("connection is built");
    }
    connection.query('select *from staff where staff_id =?',[req.params.staff_id], (err, rows)=>{
      connection.release();
      if(!err){
        res.render('editstaff',{rows})

      }else{
        console.log("something is wrong in editing staff details")

      }
    })
  })
}

exports.updatestaff =(req, res)=>{
  const {staff_id, staff_phone, staff_name, staff_resignation, staff_password}=req.body
  pool.getConnection((error, connection)=>{
    if(error){
      console.log("unable to get the connection")
    }else{
      console.log("yaa you have made the connections")
    }

    connection.query('update  staff set staff_id =?,staff_phone=?, staff_name =? , staff_resignation=?, staff_password=?', [staff_id,staff_phone, staff_name, staff_resignation,staff_password ], (err, rows)=>{
      if(err){
        console.log("something error is occured in updating staff details")

      }else{
        console.log("updation of staff is successfull")
        connection.query('select *from staff', (err, rows)=>{
          if(!err){
            res.render('staffpage', {rows})
          }

        })
       
      }
    })
  })
}

exports.ratingpage =(req, res)=>{
  pool.getConnection((error, connection)=>{
    if(error){
      console.log("connection failed - ratingpage")
    }else{
      console.log("connection is done - ratingpage")
    }
    connection.query('select cust_rating from  customer', (err, rows)=>{

      connection.release()
      if(err){
        console.log('query customer rating failed')
      }else{
        let list_of_rating =JSON.parse(JSON.stringify(rows))
        let rating_list_length=list_of_rating.length
        console.log(list_of_rating)
        console.log(rating_list_length)
        console.log(list_of_rating[0])
        console.log(list_of_rating[0].cust_rating)
        var total_rating =0
        for(let i=0; i<rating_list_length; i++){
          total_rating=total_rating+list_of_rating[i].cust_rating
        }
        total_rating =parseInt(total_rating/rating_list_length)
        res.render('rating', {rating :total_rating})
     

      }
    })
  })
}

exports.deleteStaff = (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) {
      console.log("connection failed");
    } else {
      console.log("connection is built");
    }
    //    use the connection
    connection.query(
      "delete from  staff where staff_id= ?",
      [req.params.staff_id],
      (err, rows) => {
        // when done with the connection release it
        console.log(req.params.staff_id)
        connection.release();
        if (!err) {
          res.redirect("/staffpage");
          console.log("the data from the table", rows);
        } else {
          console.log(err);
        }
      }
    );
  });
};




exports.userview = (req, res) => {
  res.render("userView");
};
