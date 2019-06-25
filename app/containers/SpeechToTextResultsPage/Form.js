
import React from 'react';
import { ReactMic } from 'react-mic';
import FileSaver from 'file-saver';

import DiffText from 'diff-text';



import './Form.css';

var diffText = (str1,str2)=>{
  let results = DiffText(str1.replace(/ */g,''),str2.replace(/ */g,''))

  let str = ""

  let resultsFormat = results.map(arr=>{
    if (arr[0]===0){
      return <span className="correct">{arr[1]}</span>
    }else if (arr[0]===1){
      return <span className="more">{arr[1]}</span>
    }else if (arr[0]===-1){
      return <span className="less">{arr[1]}</span>
    }
  }).reduce((accu, elem) => {
            return accu === null ? [elem] : [...accu, '', elem]
        }, null)

  console.log(resultsFormat)

  return resultsFormat

}

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.scripts = `หึหึ ก็ตรง ดึก อืม อืม ย หน้าตู้ เอเชีย ลงมา คือ การ ติดขัด ห้า ขาลง อาการ ติดตั้ง ก็ มา เพิ่ม ไม่ ได้ อะ เรื่องงาน ใดๆ อยู่ นะคะ หาก อาญา เอา กี่ พวกนี้ รัฐ ก็ สอง หมื่น พวก นะคะ ถ้า เป็น หุ้น นะครับ คุณ บอกรัก แต่ ถ้า เลยค่ะ`.split("\n");

this.results = `หึหึ ก็ตรง ดึก อืม อืม ย หน้าตู้ เอเชีย ลงมา คือ การ ติดขัด ห้า ขาลง อาการ ติดตั้ง ก็ มา เพิ่ม ไม่ ได้ อะ เรื่องงาน ใดๆ อยู่ นะคะ หาก อาญา เอา กี่ พวกนี้ รัฐ ก็ สอง หมื่น พวก นะคะ ถ้า เป็น หุ้น นะครับ คุณ บอกรัก แต่ ถ้า เลยค่ะ`.split("\n");

    this.state = {
      speaker: 'BallSirisak',
      record: false,
      filename: 'hello.webm',
      reading_idx: 0,
      reading_script: this.scripts[0],
      cancel_save: false
    };

    this.onStop = this.onStop.bind(this)
    this.handleChangeSpeaker = this.handleChangeSpeaker.bind(this);

  }

  handleChangeSpeaker(event) {
    this.setState({speaker: event.target.value});
  }

  startRecording = () => {
    this.setState({
      record: true
    });
  }

  stopRecording = () => {
    this.setState({
      record: false
    });
  }

  stopRecordingNoSave = () => {
    this.setState({
      record: false,
      cancel_save: true
    });
  }

  onData(recordedBlob) {
    console.log('chunk of real-time data is: ', recordedBlob);
  }

  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);

    if (this.state.cancel_save){
      this.setState({
        cancel_save: false
      });
    }else{
      FileSaver.saveAs(recordedBlob.blob, this.state.speaker + '_'+(this.state.reading_idx+1)+'.webm');


      let new_idx = this.state.reading_idx + 1

      if ( new_idx === this.scripts.length){
        alert('Finished recording');
        this.setState({
          reading_idx: new_idx,
          reading_script: "All script finished"
        });
      } else {
        this.setState({
          reading_idx: new_idx,
          reading_script: this.scripts[new_idx]
        });
      }
    }



  }

  summary() {
    return <div >
      <h4>Summary:</h4>

      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Sentence category</th>
            <th scope="col">Sentence no.</th>
            <th scope="col">Word Accuracy</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Simple</td>
            <td>1~21</td>
            <td>90%</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Online News</td>
            <td>22~31</td>
            <td>75%</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Movie scripts</td>
            <td>32~41</td>
            <td>80%</td>
          </tr>
        </tbody>
      </table>


    </div>
  }

  render() {
    return (
      <div>
        {this.summary()}
        <h4>Details:</h4>
          {this.scripts.map((line,idx)=>{
            return <div className='script-result'>
            <div className='script'>
              <div className='number'>
                {idx+1}
              </div>
              <i class="fa fa-user"></i>{line}
            </div>
              <div className='result'>
                <i class="fas fa-robot"></i>
                {this.results[idx]}
              </div>
              <div className='diff'>
                <i class="fas fa-search"></i>
                {diffText(line,this.results[idx])}
              </div>
            </div>

          })}
      </div>
    );
  }
}
