import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Grid from "@material-ui/core/Grid";
// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import EnhancedTable from "../../../components/Table/Table";
import { NavLink } from "react-router-dom";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "IRANSans, sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class UsersView extends React.Component {
  constructor(props) {
    super(props);
    // TABLE Params HERE
    this.state = {
      sortField: "id",
      order: "DESC",
      pageNumber: 1,
      pageSize: 5,
      roleFilters: []
    };
    this.updateState = this.updateState.bind(this);
  }

  updateState(params) {
    let uParam = {};
    if (params.page) {
      uParam = {
        pageNumber: params.page
      };
    } else if (params.rowsPerPage) {
      uParam = {
        pageSize: params.rowsPerPage
      };
    } else if (params.orderBy) {
      uParam = {
        order: this.state.order === "DESC" ? "ASC" : "DESC",
        sortField: params.orderBy
      };
    } else if (params.filters) {
      if (params.filters.selected !== "default") {
        uParam = {
          [params.filters.type]: [params.filters.selected]
        };
      } else {
        uParam = {
          [params.filters.type]: []
        };
      }
    }

    this.setState(uParam, () => {
      const updatedParams = Object.assign(this.state, uParam);
      this.props.fetchData(updatedParams);
    });
  }

  render() {
    // const { classes, content } = this.props;
    const headData = [
      {
        id: "actions",
        numeric: false,
        disablePadding: false,
        label: "عملگرها",
        sorting: false
      },
      {
        id: "id",
        numeric: true,
        disablePadding: false,
        label: "شناسه",
        sorting: true
      },
      {
        id: "username",
        numeric: false,
        disablePadding: false,
        label: "نام کاربری",
        sorting: true
      },
      {
        id: "name",
        numeric: false,
        disablePadding: false,
        label: "نام",
        sorting: true
      },
      {
        id: "mobile",
        numeric: true,
        disablePadding: false,
        label: "تلفن",
        sorting: true
      },
      {
        id: "free_credit",
        numeric: true,
        disablePadding: false,
        label: "اعتبار",
        sorting: true
      },
      {
        id: "numCamps",
        numeric: true,
        disablePadding: false,
        label: "تعداد کمپین",
        sorting: false
      }
    ];
    let bodyData = [];
    let filterData = {
      roleFilters: {
        name: "نقش ها",
        width: 12,
        data: [
          {
            key: "default",
            name: "همه"
          },
          {
            key: "ROLE_USER",
            name: "کاربر عادی"
          },
          {
            key: "ROLE_ADMIN",
            name: "کاربر ادمین"
          }
        ]
      }
    };
    this.props.userList.forEach(user => {
      let row = { id: null, rows: [] };
      row.id = user.id;
      // All feature available
      /*id: "",
        name: "",
        icon: false,
        editable: false,
        type: false,
        link: false,
        innerCells: [] */

      let rowData = [
        {
          id: "actions",
          name: false,
          icon: false,
          link: false,
          type: false,
          editable: false,
          innerCells: [
            {
              id: "edit",
              name: "ویرایش",
              icon: "edit",
              link: "/users/edit/" + user.id,
              type: false,
              editable: false
            },
            {
              id: "edit",
              name: "مشاهده تمام کمپین ها",
              icon: "all_inbox",
              link: "/campaings/list/" + user.username,
              type: false,
              editable: false
            }
          ]
        },
        {
          id: "id",
          name: row.id,
          icon: false,
          link: false,
          type: false,
          editable: false
        },
        {
          id: "username",
          name: user.username,
          icon: false,
          link: false,
          type: false,
          editable: false
        },
        {
          id: "name",
          name: user.name,
          icon: false,
          link: false,
          type: false,
          editable: false
        },
        {
          id: "mobile",
          name: user.mobile ? user.mobile : "تایید نشده",
          icon: false,
          link: false,
          type: false,
          editable: false
        },
        {
          id: "freeCredit",
          name: user.freeCredit,
          icon: false,
          link: false,
          type: "price",
          editable: false
        },
        {
          id: "numCamps",
          name: "",
          icon: false,
          link: false,
          type: false,
          editable: false
        }
      ];
      row.rows = rowData;
      bodyData.push(row);
    });

    return (
      <Card>
        <CardHeader color="primary">کاربران</CardHeader>
        <CardBody>
          <Grid container>
            {this.props.userList && this.props.userList.length ? (
              <EnhancedTable
                prop={this.props}
                toolbar={true}
                filters={filterData}
                pagination={true}
                serverSide={true} // serverSide pagination and sorting
                tableTitle={""}
                order={"desc"}
                orderBy={"id"}
                updateParentState={this.updateState}
                totalPages={this.props.totalPages}
                defaultPage={0}
                defaultrowsPerPage={5}
                headData={headData}
                bodyData={bodyData}
                updateCell={() => {}}
                campaignStates={false}
              />
            ) : (
              <div>
                <p>هنوز کاربری ایجاد نشده است!!</p>
                <NavLink to="/users/new">یک کاربر جدید بسازید</NavLink>
              </div>
            )}
          </Grid>
        </CardBody>
      </Card>
    );
  }
}

UsersView.propTypes = {
  classes: PropTypes.object,
  content: PropTypes.string,
  userList: PropTypes.array,
  totalPages: PropTypes.number,
  fetchData: PropTypes.func
};

export default withStyles(styles)(UsersView);
