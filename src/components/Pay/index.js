/** @format */

import { Grid, Button} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import React, {useEffect, useState} from "react";
import styles from "./styles";
import pay1 from "./img/pay1.svg";
import pay2 from "./img/pay2.svg";
import PayingProduct from "./../PayingProduct";
import {toastSuccess} from "./../../helper/toastHelper";
import {connect} from "react-redux";
import { addCart } from "../../actions/product";
import { useHistory } from "react-router";

function Pay(props) {
  const {classes} = props;
  const [product, setProduct] = useState({});
  const [sumPriceProps, setSumPriceProps] = useState("");

  useEffect(() => {
    let stateValue = props.history.location.state;
    if (stateValue.sumPrice) {
      setSumPriceProps(props.history.location.state.sumPrice);
    } else {
      setProduct(props.history.location.state.product);
      setSumPriceProps(props.history.location.state.product.price);
    }
  }, [props.history.location.state]);

  const [inputName, setinputName] = useState(false);
  const [inputNum, setinputNum] = useState(false);
  const [inputAdd, setinputAdd] = useState(false);
  const [disable, setDisable] = useState(false);

  const renderProduct = () => {
    if (props.history.location.state.productName) {
      let productsName = props.history.location.state.productName;
      if (props.listProducts.length > 0) {
        let listPayingProducts = []
        productsName.forEach((nameItem) => {
          props.listProducts.forEach((product) => {
            if (product.name.replace(/\s/g, "") == nameItem) {
              listPayingProducts = [...listPayingProducts, <PayingProduct product={product} />]
            }
          });
        });
        return listPayingProducts
      }
    } else {
      return <PayingProduct product={product} />;
    }
  };

  let history = useHistory();
  const setValue = () => {
    document.querySelector("#inputValuePaying1").value = "";
    document.querySelector("#inputValuePaying2").value = "";
    document.querySelector("#inputValuePaying3").value = "";
    toastSuccess(
      "H???? th????ng chu??ng t??i se?? li??n h???? xa??c th????c va?? h??????ng d????n ca??c b??????c ti????p theo trong th????i gian s????m nh????t"
    );
    setDisable(false);
    setinputName(false);
    setinputNum(false);
    setinputAdd(false);
    const detailUser = props.history.location.state.detailUser
    if(detailUser){
      let data = {
      ...detailUser,
      cartProduct: []
    }
    let newData = {
      data: data,
      ID: detailUser.id,
      mess: 'ok',
    };
    props.addCart(newData)
    history.push({
      pathname: "/",
    });
    }
  };

  useEffect(() => {
    if (inputNum && inputAdd && inputName) {
      setDisable(true);
    }
  }, [inputName]);
  useEffect(() => {
    if (inputNum && inputAdd && inputName) {
      setDisable(true);
    }
  }, [inputNum]);
  useEffect(() => {
    if (inputNum && inputAdd && inputName) {
      setDisable(true);
    }
  }, [inputAdd]);

  const handleButton = (e) => {
    e.target.style.border = "1px solid #ccc";
    if (e.target.name === "valueName") {
      setinputName(true);
    }
    if (e.target.name === "valueNum") {
      setinputNum(true);
    }
    if (e.target.name === "valueAdd") {
      setinputAdd(true);
    }
  };

  const handleButtonBlur = (e) => {
    if (e.target.value === "") {
      e.target.style.border = "1px solid red";
      if (e.target.name === "valueName") {
        setinputName(false);
      }
      if (e.target.name === "valueNum") {
        setinputNum(false);
      }
      if (e.target.name === "valueAdd") {
        setinputAdd(false);
      }
    } else {
      e.target.style.border = "1px solid #ccc";
      if (e.target.name === "valueName") {
        setinputName(true);
      }
      if (e.target.name === "valueNum") {
        setinputNum(true);
      }
      if (e.target.name === "valueAdd") {
        setinputAdd(true);
      }
    }
  };

  return (
    <>
      <h2 className={classes.PayTitle}>GIO?? HA??NG CU??A BA??N</h2>
      <div className={classes.container}>
        <Grid
          id="containerPaying"
          container
          spacing={4}
          className={classes.payingcontainer}
        >
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <div className={classes.boxCart}>
              <div className={classes.boxCartItem}>{renderProduct()}</div>
              <div className={classes.freeSaiGon}>
                (*) Mi???n ph?? giao h??ng khu v???c TP HCM.{" "}
              </div>
            </div>
            <div className={classes.boxCartBill}>
              <div className={classes.boxCartBillTitle}>T????ng ti????n</div>
              <div className={classes.boxCartBillNum}>{sumPriceProps} ??</div>
            </div>

            <div className={classes.boxPayContainer}>
              <h3 className={classes.boxPaytitle}>CHO??N HI??NH TH????C THANH TOA??N</h3>
              <div className={classes.boxPay}>
                <div className={classes.Paycheckbox}>
                  <input type="radio" name="paying" />
                  <img
                    alt="imgm2"
                    className={classes.imgPaycheckbox}
                    src={pay1}
                  />
                  <div className={classes.PayContent}>
                    Giao h??ng thu ti???n t???i nh??(COD)
                  </div>
                </div>
                <div className={classes.Paycheckbox}>
                  <input type="radio" name="paying" />
                  <img
                    alt="imgm2"
                    className={classes.imgPaycheckbox}
                    src={pay2}
                  />
                  <div className={classes.PayContent}>Ca?? the?? khi nh????n ha??ng</div>
                </div>
                <div className={classes.Paycheckbox}>
                  <input type="radio" name="paying" />
                  <img
                    alt="imgm2"
                    className={classes.imgPaycheckbox}
                    src={pay2}
                  />
                  <div className={classes.PayContent}>Chuy????n khoa??n</div>
                </div>
                <div className={classes.infoPayingTransfer}>
                  <div className={classes.infoPayingTransferLabel}>
                    Th??ng tin chuy????n khoa??n:
                  </div>
                  <div className={classes.infoTransferDetail}>
                    <div className={classes.infoTransferItem}>
                      <span className={classes.infoPayingTransferBold}>
                        T??n ta??i khoa??n:{" "}
                      </span>
                      C??ng Ty TNHH MTV Tin H???c Tr???n Ph??t
                    </div>
                    <div className={classes.infoTransferItem}>
                      <span className={classes.infoPayingTransferBold}>
                        Ng??n ha??ng:{" "}
                      </span>
                      Ng??n H??ng ?? Ch??u - Ph?? Th???
                    </div>
                    <div className={classes.infoTransferItem}>
                      <span className={classes.infoPayingTransferBold}>
                        S???? ta??i khoa??n:{" "}
                      </span>
                      1014049002
                    </div>
                  </div>
                  <div className={classes.infoTransferDetail}>
                    <div className={classes.infoTransferItem}>
                      <span className={classes.infoPayingTransferBold}>
                        T??n ta??i khoa??n:{" "}
                      </span>
                      ??????ng Tha??nh Ninh
                    </div>
                    <div className={classes.infoTransferItem}>
                      <span className={classes.infoPayingTransferBold}>
                        Ng??n ha??ng:{" "}
                      </span>
                      Vietcombank ??????c Ph????
                    </div>
                    <div className={classes.infoTransferItem}>
                      <span className={classes.infoPayingTransferBold}>
                        S???? ta??i khoa??n:{" "}
                      </span>
                      1014049002
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid
            id="payingInfo"
            item
            xs={6}
            sm={6}
            md={6}
            lg={6}
            className={classes.isBasic}
          >
            <div className={classes.infoLabel}>TH??NG TIN ??????T HA??NG</div>
            <div>
              <input
                type="text"
                name="valueName"
                id="inputValuePaying1"
                onChange={handleButton}
                onBlur={handleButtonBlur}
                placeholder="T??n cu??a ba??n"
                className={classes.infoInput}
              />
            </div>
            <div>
              <input
                type="text"
                name="valueNum"
                id="inputValuePaying2"
                onChange={handleButton}
                onBlur={handleButtonBlur}
                placeholder="S???? ??i????n thoa??i"
                className={classes.infoInput}
              />
            </div>
            <div>
              <input
                type="text"
                name="valueAdd"
                id="inputValuePaying3"
                onChange={handleButton}
                onBlur={handleButtonBlur}
                placeholder="??i??a chi??"
                className={classes.infoInput}
              />
            </div>
            <div>
              <textarea
                placeholder="Ghi chu??"
                rows="4"
                className={classes.infoInput}
              ></textarea>
            </div>
            <div className={classes.warningLabel}>
              B???n vui l??ng nh???p ????ng s??? ??i???n tho???i ????? ch??ng t??i s??? g???i x??c nh???n
              ????n h??ng tr?????c khi giao h??ng. Xin c???m ??n!
            </div>
            <Button
              disabled={!disable}
              onClick={setValue}
              variant="contained"
              className={classes.buyingBtn}
            >
              <div className={classes.buying}>MUA NGAY</div>
              <div className={classes.buyTitle}>
                Go??i xa??c nh????n va?? giao ha??ng t????n n??i
              </div>
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

// const FORM_NAME = "TASK-MANAGEMENT";

const mapStateToProps = (state) => {
  return {
    listProducts: state.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCart: (data) => {
      return dispatch(addCart(data));
    },};
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Pay)
);
