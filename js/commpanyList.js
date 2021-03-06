import React from 'react';


import { ListView, Card, WingBlank, WhiteSpace } from 'antd-mobile';
  
const data = [

];
let index = data.length - 1;

const NUM_SECTIONS = 2;
const NUM_ROWS_PER_SECTION = 2;
let pageIndex = 0;
const CommpanyList = React.createClass({
  getInitialState() {
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.dataBlob = {};
    this.sectionIDs = [];
    this.rowIDs = [];
    this.genData = (pIndex = 0) => {
      for (let i = 0; i < NUM_SECTIONS; i++) {
        const ii = (pIndex * NUM_SECTIONS) + i;
        const sectionName = `Section ${ii}`;
        this.sectionIDs.push(sectionName);
        this.dataBlob[sectionName] = sectionName;
        this.rowIDs[ii] = [];

        for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
          const rowName = `S${ii}, R${jj}`;
          this.rowIDs[ii].push(rowName);
          this.dataBlob[rowName] = rowName;
        }
      }
      // new object ref
      this.sectionIDs = [].concat(this.sectionIDs);
      this.rowIDs = [].concat(this.rowIDs);
    };
    this.genData();
    return {
      dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
      isLoading: false,
    };
  },

  onEndReached(event) {
    // load new data
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.genData(++pageIndex);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
        isLoading: false,
      });
    }, 1000);
  },

  render() {
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        backgroundColor: '#F5F5F9',
        height: 8,
        borderTop: '1px solid #ECECED',
        borderBottom: '1px solid #ECECED',
      }} />
    );
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <WingBlank size="lg">
    <WhiteSpace size="lg" />
    <Card>
  
      <Card.Body>
        <img src="http://anshan.house.sina.com.cn/images/scan/2011-08-18/U4154P904T12D20956F508DT20110819121535.jpg"/>
      </Card.Body>
      <Card.Header
        title=""
        thumb="http://hearthstone.nos.netease.com/3/suspense/logo_blizzard.png"
        extra={<span>大连天禹星</span>}
      />
      <Card.Footer content="" extra={<div>大连市</div>} />
    </Card>
  </WingBlank>
      );
    };
    return (<div style={{ margin: '0 auto', width: '96%' }}>
      <ListView
        dataSource={this.state.dataSource}
       // renderHeader={() => <span>header</span>}
        renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? '加载中...' : '加载完毕'}
        </div>}
        // renderSectionHeader={(sectionData) => (
        //   <div>{`任务 ${sectionData.split(' ')[1]}`}</div>
        // )}
        renderRow={row}
        renderSeparator={separator}
        pageSize={4}
        scrollRenderAheadDistance={500}
        scrollEventThrottle={20}
        onScroll={() => { console.log('scroll'); }}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
        style={{
          height: 700,
          overflow: 'auto',
          border: '1px solid #ddd',
          margin: '10px 0',
        }}
      />
    </div>);
  },
});
export default CommpanyList;