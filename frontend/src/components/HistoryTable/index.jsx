import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import {Button, ButtonToolbar} from "react-bootstrap";

const columns = [
  {
    Header: "id",
    accessor: "id",
    show: false
  },
  {
    Header: "Data",
    accessor: "data",
    filterMethod: (filter, row) => {
      if(String(row["data"]).toLowerCase().includes(filter.value.toLowerCase()))
      {
        return true;
      }
      else {
        return false;
      }
    }
  },
  {
    Header: "Old Label",
    accessor: "old_label",
    width: 100
  },
  {
    Header: "Old Label ID",
    accessor: "old_label_id",
    show: false
  },
  {
    Header: "Date/Time",
    accessor: "timestamp",
    id: "timestamp",
    width: 150
  }
];


class HistoryTable extends React.Component {

  componentWillMount() {
      this.props.getHistory();
  }


  render() {
  const {history_data, labels, changeLabel, changeToSkip} = this.props;

  if(history_data && history_data.length > 0)
  {
    var table_data = history_data[0]
  }
  else {
    table_data = []
  }
  var page_sizes = [1];
  var counter = 1;
  for(var i = 5; i < table_data.length; i+=5*counter)
  {
    page_sizes.push(i);
    counter +=1;
  }
  page_sizes.push(table_data.length);

  return (
    <div>
    <h3>Instructions</h3>
    <p>This page allows a coder to change past labels.</p>
    <p>To annotate, click on a data entry below and select the label from the expanded list of labels. The chart will then update with the new label and current timestamp </p>
    <p><strong>NOTE:</strong> Data labels that are changed on this page will not effect past model accuracy or data selected by active learning in the past. The training data will only be updated for the next run of the model</p>
      <ReactTable
        data={table_data}
        columns={columns}
        pageSizeOptions={page_sizes}
        pageSize={(table_data.length < 50) ? table_data.length : 50}
        SubComponent={row => {
          return (
            <div className="sub-row">
              <p>{row.row.data}</p>
              <ButtonToolbar bsClass="btn-toolbar pull-right">
                {labels.map( (label) => {
                  return (
                  <Button key={label.pk.toString() + "_his_" + row.row.id.toString()}
                  onClick={() => {
                    if(!(row.row.old_label_id === label.pk))
                    {
                      changeLabel(row.row.id,row.row.old_label_id,label.pk)
                    }
                  }}
                  bsStyle="primary"
                  >{label.name}</Button>
                )})}
                <Button onClick={() => changeToSkip(row.row.id,row.row.old_label_id)}
                bsStyle="info"
                >Skip</Button>
              </ButtonToolbar>
            </div>
          );
        }}
        filterable={true}
        defaultSorted={[{
          id: "timestamp",
          desc: true
        }]}

      />
    </div>
  )
  }

}


//This component will have
// change label (action)
// change_to_skip (action)
// data
HistoryTable.propTypes = {
  getHistory: PropTypes.func.isRequired,
  history_data: PropTypes.arrayOf(PropTypes.object),
  labels: PropTypes.arrayOf(PropTypes.object),
  changeLabel: PropTypes.func.isRequired,
  changeToSkip: PropTypes.func.isRequired
};

export default HistoryTable;
