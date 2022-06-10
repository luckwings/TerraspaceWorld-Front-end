import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { WalletContext, STAKE_CONTRACT_ID, NFT_CONTRACT_ID, MAX_GAS, NftData, NftContractMetadata, DEPOSIT } from '../contexts/wallet'
import { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react'
import { parseNearAmount } from 'near-api-js/lib/utils/format'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineController,
  BarController,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { watch } from 'fs'

ChartJS.register(
  CategoryScale,
  LineController,
  BarController,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type CollectionStat = {
  total_items: number
  total_listed: number
  total_owners: number
  floor_price: number
  floor_price_24: number
  floor_price_7: number
  total_volume: number
  instant_volume: number
  day_volume: number
}

const Mint: NextPage = () => {
  const { wallet, getNftMetadata, getCollectionList, getCollectionMetadata } = useContext(WalletContext)
  const [transactionData, setTransactionData] = useState<CollectionStat[]>([])
  const [collectionList, setCollectionList] = useState<string[]>([])
  const [currentCollectionId, setCurrentCollectionId] = useState<string>('');
  const [collectionMetadataList, setCollectionMetadataList] = useState<Map<string, any>>(new Map());
  const [chartOptions, setChartOptions] = useState<any>(undefined);
  const [chartData, setChartData] = useState<any>(undefined);
  const [dashboardEnabled, setDashboardEnabled] = useState<boolean>(false);

  const [searchText, setSearchText] = useState<string>("");
  const [searchInputFocus, setSearchInputFocus] = useState<boolean>(false);
  const [showListData, setShowListData] = useState<any[]>([]);
  const [showListData1, setShowListData1] = useState<any[]>([]);
  const [selectedShowListDataNum, setSelectedShowListDataNum] = useState<number>(0);
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const [editingTitle, setEditingTitle] = useState<string>('');

  const [searchedList, setSearchedList] = useState<any[]>([]);

  const handleSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const getTransactionsForCollection = async (account_id: string) => {
    const api = process.env.NEXT_PUBLIC_API;

    // const api = "http://35.75.88.169:3001";
    // const api = 'https://api.terraspaces.io';
    const getAPI = async () => {
      const statisticDataEndpoint = `${api}/statistic_data`;
      const result = await fetch(statisticDataEndpoint, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          account_id
        })
      });
      return (await result.json())
    };
    const result = await getAPI();
    setTransactionData(result);
  }

  const onSelect = async (account_id: string) => {
    await getTransactionsForCollection(account_id);
    setCurrentCollectionId(account_id);
  }

  const fetchCollectionList = async () => {
    let stakeData = await wallet?.account().viewFunction(STAKE_CONTRACT_ID,
      "get_staking_informations_by_owner_id",
      {
        account_id: wallet.getAccountId(),
        from_index: "0",
        limit: 100,
      });
    if (stakeData == undefined)
      stakeData = [];
    for (let i = 0; i < stakeData.length; i++) {
      const nft_info = await wallet?.account().viewFunction(stakeData[i].nft_contract_id,
        "nft_token",
        {
          token_id: stakeData[i].token_id,
        });

      if ((JSON.stringify(nft_info.approved_account_ids).match(STAKE_CONTRACT_ID) || []).length
        == (JSON.stringify(nft_info.approved_account_ids).match('":') || []).length) {
        setDashboardEnabled(true);
        const list = await getCollectionList();
        setCollectionList(list);

        return;
      }
    }

  }

  const fetchCollectionMetadataList = async () => {
    let list = new Map();
    for (let i = 0; i < collectionList.length; i++) {
      const data = await getCollectionMetadata(collectionList[i]);
      list.set(collectionList[i], data);
    }
    setCollectionMetadataList(list);

    if (collectionList.length > 0 && JSON.parse(localStorage.getItem('watchlistdata')!).length > 0) {
      var showListDataTmp1 = [];
      for (let i = 0; i < JSON.parse(localStorage.getItem('watchlistdata')!).length; i++) {
        let item = JSON.parse(JSON.parse(localStorage.getItem('watchlistdata')!)[i]);

        if (item.data.length > 0) {


          let keys = [...list.entries()].filter(({ 1: v }) => v.name === item.data[0]).map(([k]) => k);
          setSelectedShowListDataNum(i);
          onSelect(keys[0]);
          break;
          //   // setSelectedShowListDataNum(i);
          //   for (let j = 0; j < collectionList.length; i++) {
          //     if (list.get(collectionList[i]) == item.data[0]) onSelect(collectionList[i]);
          //   }
        }
      }
    }
  };

  const makeChartData = async () => {
    if (currentCollectionId == '' || transactionData.length == 0) {
      setChartOptions(undefined);
      setChartData(undefined);
    } else {
      let floor_data: number[] = [];
      let list_data: number[] = [];
      let volume_data: number[] = [];
      let floor_max: number = 0;
      let list_max: number = 0;
      let volume_max: number = 0;

      for (let i = 0; i < transactionData.length; i++) {
        if (transactionData[i].floor_price > floor_max)
          floor_max = transactionData[i].floor_price;
        if (transactionData[i].total_listed > list_max)
          list_max = transactionData[i].total_listed;
        if (transactionData[i].instant_volume > volume_max)
          volume_max = transactionData[i].instant_volume;
        floor_data.push(transactionData[i].floor_price)
        list_data.push(transactionData[i].total_listed)
        volume_data.push(transactionData[i].instant_volume)
      }

      if (floor_max == 0)
        floor_max = 100;
      if (list_max == 0)
        list_max = 200;
      if (volume_max == 0)
        volume_max = 100;

      let labels: string[] = [];
      let label_mins: string[] = ['00', '10', '20', '30', '40', '50'];
      for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 6; j++) {
          labels.push(i.toString() + ":" + label_mins[j]);
        }
      }
      labels.push('24:00');

      const options = {
        responsive: true,
        interaction: {
          mode: 'index' as const,
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: false,
            text: 'Chart.js Line Chart - Multi Axis',
          },
        },
        scales: {
          x: {
            type: 'category',
            labels: labels
          },
          y: {
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            grid: {
              drawOnChartArea: false,
            },
            min: 0,
            max: Math.ceil(floor_max * 1.5),
          },
          y1: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
            min: 0,
            max: Math.ceil(list_max * 2),
          },
          y2: {
            type: 'linear' as const,
            display: false,
            position: 'left' as const,
            min: 0,
            max: Math.ceil(volume_max * 4),
          },
        },
      };

      const data = {
        datasets: [
          {
            type: 'line' as const,
            label: 'Floor Price',
            data: floor_data,
            borderColor: 'rgb(63, 72, 204)',
            backgroundColor: 'rgba(63, 72, 204, 0.5)',
            yAxisID: 'y',
            borderWidth: 1,
            radius: 1,
          },
          {
            type: 'line' as const,
            label: 'Listed',
            data: list_data,
            borderColor: 'rgb(0, 162, 232)',
            backgroundColor: 'rgba(0, 162, 232, 0.5)',
            yAxisID: 'y1',
            borderWidth: 1,
            radius: 1,
          },
          {
            type: 'bar' as const,
            label: 'Volume',
            data: volume_data,
            borderColor: 'rgb(255, 128, 192)',
            backgroundColor: 'rgba(255, 128, 192, 0.5)',
            yAxisID: 'y2',
            radius: 1,
          },
        ],
      };

      setChartOptions(options);
      setChartData(data);
    }
  }

  const addShowList = (text: string, data: string) => {
    var itemArray = JSON.parse(JSON.parse(localStorage.getItem('watchlistdata')!)[selectedShowListDataNum]).data;

    if (!itemArray.includes(text)) {

      // itemArray = JSON.parse(JSON.parse(localStorage.getItem('watchlistdata')!)[0]).data;
      itemArray.push(text)
      var showListDataTmp = []
      var showListDataTmp2 = []
      for (let i = 0; i < JSON.parse(localStorage.getItem('watchlistdata')!).length; i++) {
        if (i === selectedShowListDataNum) {
          let tmp = JSON.parse(JSON.parse(localStorage.getItem('watchlistdata')!)[i]);

          tmp.data = itemArray;//JSON.parse();
          showListDataTmp.push(JSON.stringify(tmp));
          showListDataTmp2.push(tmp)
        } else {
          showListDataTmp.push(JSON.stringify(JSON.parse(JSON.parse(localStorage.getItem('watchlistdata')!)[i])));
          showListDataTmp2.push(JSON.parse(JSON.parse(localStorage.getItem('watchlistdata')!)[i]));
        }
      }
      setShowListData1(showListDataTmp2);


      localStorage.setItem('watchlistdata', JSON.stringify(showListDataTmp))
      //

      //setShowListData([...showListData, text]);
      // JSON.parse(JSON.parse(localStorage.getItem('watchlistdata')!)[0])
    }
    onSelect(data);
  }
  const editTitle = (num: number, text: string) => {
    setSelectedShowListDataNum(num)
    setEditFlag(true);
    setEditingTitle(text)
  }

  const editDone = (key: string) => {
    if (key === "Enter") {


      //
      var showListDataTmp2 = []
      var showListDataTmp = []
      for (let i = 0; i < JSON.parse(localStorage.getItem('watchlistdata')!).length; i++) {
        if (i === selectedShowListDataNum) {
          let tmp = JSON.parse(JSON.parse(localStorage.getItem('watchlistdata')!)[i]);
          tmp.name = editingTitle;

          showListDataTmp.push(JSON.stringify(tmp));
          showListDataTmp2.push(tmp)

        } else {
          showListDataTmp.push(JSON.stringify(JSON.parse(JSON.parse(localStorage.getItem('watchlistdata')!)[i])));
          showListDataTmp2.push(JSON.parse(JSON.parse(localStorage.getItem('watchlistdata')!)[i]));
        }
      }

      setShowListData1(showListDataTmp2);
      localStorage.setItem('watchlistdata', JSON.stringify(showListDataTmp))


      //
      setEditFlag(false);

    }
  }

  const deleteWatchList = (index: number) => {
    var showListDataTmp2 = []
    var showListDataTmp = []
    for (let i = 0; i < JSON.parse(localStorage.getItem('watchlistdata')!).length; i++) {

      if (i !== index) {
        showListDataTmp.push(JSON.stringify(JSON.parse(JSON.parse(localStorage.getItem('watchlistdata')!)[i])));
        showListDataTmp2.push(JSON.parse(JSON.parse(localStorage.getItem('watchlistdata')!)[i]));
      }
    }
    setShowListData1(showListDataTmp2);
    localStorage.setItem('watchlistdata', JSON.stringify(showListDataTmp))

    var tmp = JSON.parse(JSON.parse(localStorage.getItem('watchlistdata')!)[0]);
    if (tmp.data.length > 0) {
      let keys = [...collectionMetadataList.entries()].filter(({ 1: v }) => v.name === tmp.data[0]).map(([k]) => k);
      onSelect(keys[0]);
    } else {
      onSelect('');
    }
    setSelectedShowListDataNum(index);

  }

  const duplicateWatchList = (index: number) => {
    var showListDataTmp2 = []
    var showListDataTmp = []
    var tmp;
    for (let i = 0; i < JSON.parse(localStorage.getItem('watchlistdata')!).length; i++) {

      if (i === index) {
        tmp = JSON.parse(JSON.parse(localStorage.getItem('watchlistdata')!)[i]);



        showListDataTmp.push(JSON.stringify(tmp));
        showListDataTmp2.push(tmp)

      } else {
        showListDataTmp.push(JSON.stringify(JSON.parse(JSON.parse(localStorage.getItem('watchlistdata')!)[i])));
        showListDataTmp2.push(JSON.parse(JSON.parse(localStorage.getItem('watchlistdata')!)[i]));
      }
    }

    if (Object.keys(tmp).length > 0) {
      let tmp2 = { ...tmp };
      tmp2.name = tmp.name + " copy"

      showListDataTmp.push(JSON.stringify(tmp2));
      showListDataTmp2.push(tmp2)
    }


    setShowListData1(showListDataTmp2);
    localStorage.setItem('watchlistdata', JSON.stringify(showListDataTmp))
  }

  const addEmptyWatchList = () => {
    if (JSON.parse(localStorage.getItem('watchlistdata')!).length > 4) return;
    var showListDataTmp2 = []
    var showListDataTmp = []
    var tmp;
    for (let i = 0; i < JSON.parse(localStorage.getItem('watchlistdata')!).length; i++) {
      showListDataTmp.push(JSON.stringify(JSON.parse(JSON.parse(localStorage.getItem('watchlistdata')!)[i])));
      showListDataTmp2.push(JSON.parse(JSON.parse(localStorage.getItem('watchlistdata')!)[i]));
    }
    showListDataTmp.push(JSON.stringify({ name: "WatchList #" + (JSON.parse(localStorage.getItem('watchlistdata')!).length + 1), data: [] }));
    showListDataTmp2.push({ name: "WatchList #" + (JSON.parse(localStorage.getItem('watchlistdata')!).length + 1), data: [] });


    setShowListData1(showListDataTmp2);
    localStorage.setItem('watchlistdata', JSON.stringify(showListDataTmp))
  }

  const setShowList = (index: number, title: string) => {
    if (editFlag) setEditingTitle(title);
    setSelectedShowListDataNum(index);
    let tmp = JSON.parse(JSON.parse(localStorage.getItem('watchlistdata')!)[index]);

    if (tmp.data.length > 0) {
      let keys = [...collectionMetadataList.entries()].filter(({ 1: v }) => v.name === tmp.data[0]).map(([k]) => k);
      onSelect(keys[0]);

    } else {
      onSelect('');

    }


  }

  const deleteWatchItem = (index: number, data: string) => {
    var showListDataTmp2 = []
    var showListDataTmp = []
    var tmp: any;
    var keys: any[] = [];
    for (let i = 0; i < JSON.parse(localStorage.getItem('watchlistdata')!).length; i++) {

      if (i === index) {
        tmp = JSON.parse(JSON.parse(localStorage.getItem('watchlistdata')!)[i]);

        let stringIdx = tmp.data.indexOf(data);
        let dataTmp = tmp.data.slice(0, stringIdx).concat(tmp.data.slice(stringIdx + 1))
        tmp.data = dataTmp;

        if (dataTmp.length > 0) {
          keys = [...collectionMetadataList.entries()].filter(({ 1: v }) => v.name === dataTmp[0]).map(([k]) => k);
          setTimeout(() => {
            setSelectedShowListDataNum(index);
            onSelect(keys[0]);
          }, 500);

        }

        showListDataTmp.push(JSON.stringify(tmp));
        showListDataTmp2.push(tmp)

      } else {
        showListDataTmp.push(JSON.stringify(JSON.parse(JSON.parse(localStorage.getItem('watchlistdata')!)[i])));
        showListDataTmp2.push(JSON.parse(JSON.parse(localStorage.getItem('watchlistdata')!)[i]));
      }
    }
    setShowListData1(showListDataTmp2);
    localStorage.setItem('watchlistdata', JSON.stringify(showListDataTmp))

    if (!keys || !(keys.length > 0)) {
      for (let i = 0; i < JSON.parse(localStorage.getItem('watchlistdata')!).length; i++) {
        tmp = JSON.parse(JSON.parse(localStorage.getItem('watchlistdata')!)[i]);
        if (tmp.data.length > 0) {

          keys = [...collectionMetadataList.entries()].filter(({ 1: v }) => v.name === tmp.data[0]).map(([k]) => k);
          setTimeout(() => {
            setSelectedShowListDataNum(i);
            onSelect(keys[0]);
          }, 500);
          break;
        }
      }
    }
    if (!keys || !(keys.length > 0)) {
      setTimeout(() => {
        setSelectedShowListDataNum(index);
        onSelect('');
      }, 500);

    }


  }

  useEffect(() => {
    try {
      var tmpLength = JSON.parse(localStorage.getItem('watchlistdata')!).length;
      var showListDataTmp1 = [];
      for (let i = 0; i < tmpLength; i++) {
        let item = JSON.parse(JSON.parse(localStorage.getItem('watchlistdata')!)[i]);
        showListDataTmp1.push(item);
      }

      setShowListData1(showListDataTmp1);
    } catch (e) {
      console.log(e)
      console.log('local storage item inited')
      localStorage.setItem('watchlistdata', JSON.stringify([JSON.stringify({ name: "WatchList #1", data: [] })]))
      setShowListData1([{ name: "WatchList #1", data: [] }]);
    }
    //

    // localStorage.setItem('watchlistdata', JSON.stringify([JSON.stringify({ title: "title1", data: ["terra", "terraspace1"] }), JSON.stringify({ title: "title1", data: ["terra", "terraspace1"] })]))
    // console.log(JSON.parse(localStorage.getItem('watchlistdata')!), ">>> json parse data")


    //item push into array
    // if(JSON.parse(localStorage.getItem('watchlistdata')!) && JSON.parse(localStorage.getItem('watchlistdata')!).length>0 ) {
    //   let itemArray = JSON.parse(JSON.parse(localStorage.getItem('watchlistdata')!)[0]).data;
    //   itemArray.push("pushed item1")
    //   var showListDataTmp = []
    //   for (let i = 0; i < JSON.parse(localStorage.getItem('watchlistdata')!).length; i++) {
    //     if (i === 0) {
    //       let tmp = JSON.parse(JSON.parse(localStorage.getItem('watchlistdata')!)[i]);
    //       console.log(tmp)
    //       tmp.data = itemArray;//JSON.parse();
    //       showListDataTmp.push(JSON.stringify(tmp));

    //     } else showListDataTmp.push(JSON.parse(localStorage.getItem('watchlistdata')!)[i])
    //   }
    //   console.log(showListDataTmp, "...first item")
    // }

  }, [])

  useEffect(() => {
    makeChartData();
  }, [currentCollectionId]);

  useEffect(() => {
    fetchCollectionMetadataList();
  }, [collectionList]);

  useEffect(() => {
    if (wallet)
      fetchCollectionList();
  }, [wallet]);


  return (
    <main className="dashboard-page position-relative pt-160 fix">
      <div className="vector-abs">
        <img src="assets/img/vector/Vector.png" alt="Vector" loading="lazy" />
      </div>
      <div className="dashboard-wrapper">
        <div className="" style={{ marginLeft: 60, marginRight: 60 }}>
          {
            wallet?.isSignedIn() && dashboardEnabled == true ?
              <div className="row">
                <div className="col-xl-3 col-lg-4 col-md-4 mb-25">
                  <div className="watchlist-wrapper card-bg">

                    {
                      showListData1 && showListData1.length > 0 &&
                      showListData1.map((watchItem, index) => {
                        return (
                          <div className="single-watchlist" key={index}>

                            <div className={`watch-t mb-15 d-flex align-items-center justify-content-between ${index === selectedShowListDataNum && "watch-t-active"}`} >
                              <h3 className="t-18-b white-c select-m-showlist" onClick={() => setShowList(index, watchItem.name)}>
                                <span>

                                  {
                                    index === selectedShowListDataNum && editFlag ?
                                      <input type='text' value={editingTitle}
                                        onChange={(e) => setEditingTitle(e.target.value)}
                                        onKeyPress={(e) => editDone(e.key)}
                                        onBlur={e => { setEditFlag(false) }}
                                        className={`watch-t-input`} /> :
                                      watchItem.name
                                  }
                                </span>
                              </h3>
                              <div className="track-select position-relative d-inline-block">
                                <div className="dropdown">
                                  <button className="btn p-o border-0 dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                                    <img src="assets/img/icons/dots.svg" alt="" />
                                  </button>
                                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" data-popper-placement="bottom-start" style={{ position: "absolute", inset: "0px auto auto 0px", margin: 0, transform: "translate(0px, 51px)" }}>
                                    <li><a className="dropdown-item" onClick={() => editTitle(index, watchItem.name)}> Edit Title</a></li>
                                    {
                                      showListData1.length < 5 &&
                                      <li><a className="dropdown-item" onClick={() => duplicateWatchList(index)}> Duplicate</a></li>
                                    }
                                    {
                                      showListData1.length > 1 &&
                                      <li><a className="dropdown-item" onClick={() => deleteWatchList(index)}> Delete</a></li>
                                    }
                                  </ul>
                                </div>

                              </div>
                            </div>
                            <div className="watch-sub-f pl-20 ">


                              {
                                watchItem && watchItem.data && watchItem.data.length > 0 &&

                                collectionList.map((data, key) => {
                                  if (collectionMetadataList.get(data) != undefined && (watchItem.data as any[]).includes(collectionMetadataList.get(data).name))
                                    return (
                                      <div className="watch-subs-t mb-10 d-flex align-items-center justify-content-between" key={key} >
                                        <div className={`d-flex align-items-center watch-i-data`} onClick={() => { onSelect(data); setSelectedShowListDataNum(index); }}>
                                          {
                                            collectionMetadataList.get(data)?.icon != undefined ?
                                              <img className="mr-8" src={collectionMetadataList.get(data).icon} alt="Icon" width={32} height={32} /> :
                                              <img className="mr-8" src="assets/img/icons/Near.png" alt="Near" width={32} height={32} />
                                          }
                                          <h3 className="t-14 neutral-c  ">
                                            <span>{collectionMetadataList.get(data).name}</span>
                                          </h3>
                                        </div>
                                        <div>
                                          <span className='watch-i-close' onClick={() => deleteWatchItem(index, collectionMetadataList.get(data) != undefined ? collectionMetadataList.get(data).name : data)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="css-1plrovb"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                          </span>
                                        </div>
                                      </div>
                                    )
                                })

                              }
                            </div>
                          </div>
                        )
                      })
                    }
                    {/* <div className="single-watchlist">

                      <div className="watch-t mb-20 d-flex align-items-center justify-content-between">
                        <h3 className="t-18-b white-c">
                          <span>Terraspaces</span>
                        </h3>
                        <div className="track-select position-relative d-inline-block">
                          <div className="dropdown">
                            <button className="btn p-o border-0 dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                              <img src="assets/img/icons/dots.svg" alt="" />
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" data-popper-placement="bottom-start" style={{ position: "absolute", inset: "0px auto auto 0px", margin: 0, transform: "translate(0px, 51px)" }}>
                              <li><a className="dropdown-item" href="#"> Edit Title</a></li>
                              <li><a className="dropdown-item" href="#"> Duplicate</a></li>
                            </ul>
                          </div>

                        </div>
                      </div>
                      <div>



                      </div>
                      <div className="watch-sub-f pl-20 ">

                        {
                          collectionList.map((data, key) => {
                            if (showListData.includes(collectionMetadataList.get(data) != undefined ? collectionMetadataList.get(data).name : data))
                              return (
                                <div className="watch-subs-t mb-10 d-flex align-items-center" key={key} onClick={() => { onSelect(data); }}>
                                  {
                                    collectionMetadataList.get(data)?.icon != undefined ?
                                      <img className="mr-8" src={collectionMetadataList.get(data).icon} alt="Icon" width={32} height={32} /> :
                                      <img className="mr-8" src="assets/img/icons/Near.png" alt="Near" width={32} height={32} />
                                  }
                                  <h3 className="t-14 neutral-c  ">
                                    <span>{collectionMetadataList.get(data) != undefined ? collectionMetadataList.get(data).name : data}</span>
                                  </h3>
                                </div>
                              )
                          })
                        }
                      </div>

                    </div> */}
                    {/*  */}
                    {/* <div className="single-watchlist">
                      <div className="watch-t mb-20 d-flex align-items-center justify-content-between">
                        <h3 className="t-18-b white-c">
                          <span>Terraspaces</span>
                        </h3>
                        <div className="track-select position-relative d-inline-block">
                          <div className="dropdown">
                            <button className="btn p-o border-0 dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                              <img src="assets/img/icons/dots.svg" alt="" />
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" data-popper-placement="bottom-start" style={{ position: "absolute", inset: "0px auto auto 0px", margin: 0, transform: "translate(0px, 51px)" }}>
                              <li><a className="dropdown-item" href="#"> Edit Title</a></li>
                              <li><a className="dropdown-item" href="#"> Duplicate</a></li>
                            </ul>
                          </div>

                        </div>
                      </div>
                      <div className="watch-sub-f pl-20 ">
                        <div className="watch-subs-t mb-10 d-flex align-items-center">
                          <img className="mr-8" src="assets/img/dashbaord/stakin.png" alt="stakin " />
                          <h3 className="t-14 neutral-c  ">
                            <span>Terraspaces</span>
                          </h3>
                        </div>
                        <div className="watch-subs-t mb-10 d-flex align-items-center">
                          <img className="mr-8" src="assets/img/dashbaord/stakin.png" alt="stakin " />
                          <h3 className="t-14 neutral-c ">
                            <span>Terraspaces</span>
                          </h3>
                        </div>
                      </div>

                    </div> */}
                    <div className="watch-btn">
                      <button className="cmn-btn f-18 redius-12" onClick={() => addEmptyWatchList()}>
                        <span> ADD WATCHLIST</span>
                        <img src="assets/img/icons/plus.svg" alt="plus" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-xl-9 col-lg-8 col-md-8">
                  <div className="dashboard-t d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-center align-items-center ">
                      {
                        chartOptions != undefined ?
                          <>
                            <div className="dashboard-icon mr-12 ">
                              {
                                collectionMetadataList.get(currentCollectionId)?.icon != undefined ?
                                  <img className="mr-8" src={collectionMetadataList.get(currentCollectionId).icon} alt="Icon" width={32} height={32} /> :
                                  <img className="mr-8" src="assets/img/icons/Near.png" alt="Near" width={32} height={32} />
                              }
                            </div>
                            <div className="hero-description ">
                              <div className="hero-subs-t d-flex align-items-center justify-content-center ">
                                <h3 className="t-18-b white-c mr-8 ">
                                  <span>{collectionMetadataList.get(currentCollectionId)?.name}</span>
                                </h3>
                                <img src="assets/img/icons/verified.svg " width="20 " height="20 " alt="verified " />
                              </div>
                              <div className="pt-1 hero-subs-s-title d-flex align-items-center justify-content-center ">
                                <a className="t-14 neutral-c mr-4 " href={'https://paras.id/collection/' + currentCollectionId} target="_blank" rel="noreferrer">
                                  {currentCollectionId}
                                </a>
                                <img src="assets/img/icons/chain.svg " width="20 " height="20 " alt="verified " />
                              </div>
                            </div>
                          </> : <></>
                      }
                    </div>
                    <div className="search-f pt-3 pt-lg-0" style={{ width: "270px", height: "42px" }}>
                      <ClickAwayListener onClickAway={() => setSearchInputFocus(false)}>

                        <div className="d-flex justify-content-center" style={{ position: "relative" }} >

                          <div className='search-box-panel' >
                            <input type="text " name="text " id="text " placeholder="Search by Collections " onChange={(e) => handleSearchText(e)} value={searchText} onFocus={() => setSearchInputFocus(true)} />
                            <span className='search-icon'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="css-14oyyg8"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </span>
                          </div>

                          {
                            searchInputFocus &&
                            <div className="search-item-panel">


                              {
                                showListData1 && showListData1[selectedShowListDataNum] && showListData1[selectedShowListDataNum].data &&
                                collectionList.filter((data) => !(showListData1[selectedShowListDataNum].data as any[]).includes(collectionMetadataList.get(data) != undefined ? collectionMetadataList.get(data).name : data) &&
                                  (collectionMetadataList.get(data) == undefined && data.toLowerCase().search(searchText.toLowerCase()) >= 0 ||
                                    collectionMetadataList.get(data) != undefined && collectionMetadataList.get(data).name.toLowerCase().search(searchText.toLowerCase()) >= 0)).slice(0, 5).map((data, key) => {
                                      return (

                                        collectionMetadataList.get(data) != undefined &&
                                        <div className="watch-subs-t padding-10 justify-content-between d-flex align-items-center" key={key} onClick={() => { addShowList(collectionMetadataList.get(data) != undefined && collectionMetadataList.get(data).name, data); setSearchInputFocus(false); }}>

                                          <h3 className="t-14 neutral-c  ">

                                            <span>{collectionMetadataList.get(data).name}</span>
                                          </h3>
                                          <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="css-rf1eo"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                                          </span>
                                        </div>


                                      )
                                    })
                              }
                            </div>
                          }
                        </div>
                      </ClickAwayListener>

                    </div>
                  </div>
                  <div className="chart-b">
                    {
                      chartOptions != undefined ?
                        <Chart type='bar' options={chartOptions} data={chartData} /> :
                        <div style={{ color: "white" }}>
                          <h3 className='text-center mt-5 '>
                            Current Watchlist is empty.
                          </h3>
                        </div>
                    }
                  </div>
                </div>
              </div>
              :
              <h3>Please Stake Terraspaces NFT or Partner NFT to Access Dashboard.</h3>
          }
        </div>
      </div>
    </main>
  )
}

export default Mint
