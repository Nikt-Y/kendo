import React from "react";

import { Grid, GridColumn } from "@progress/kendo-react-grid";

interface Data {
    data: any,
    fields: any
}

var numbers = [1, 2, 3];
for (var _i = 0; _i < numbers.length; _i++) {
  var num = numbers[_i];
  console.log(num);
}

const MyGrid = (props: Data) => {
    var numbers = [1, 2, 3];
    for (var _i = 0; _i < 10; _i++) {
      var num = numbers[_i];
      console.log(num);
    }

    return (
        <Grid >

        </Grid>
    );
};

export default MyGrid;