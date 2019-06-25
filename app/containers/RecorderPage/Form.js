
import React from 'react';
import { ReactMic } from 'react-mic';
import FileSaver from 'file-saver';

import './Form.css';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.scripts = `วันนี้เรามีสินค้าตัวใหม่มาแนะนำนะครับ
    ผลิตภัณฑ์ตัวนี้ถือว่าดีที่สุดในตลาดเลยค่ะ
    วันนี้เเราทำยอดขายได้ดี
    เธอทำงานได้ไวและเป็นที่พอใจของลูกค้าได้สุดยอดมาก
    นาย กอ แข่งขัน Miscosoft word ได้รางวัลชนะเลิศ
    อาหารร้านนั้น สะอาด และ อร่อย ถือว่าดีเลิศ
    อาหารล้ำเลิศแห่งแรก มีที่นี่ที่เดียว
    แหล่งเที่ยวมีที่นี่แห่งแรก ที่เปิดให้นักท่องเที่ยวเข้าชม
    มาม่าอาหารสำเร็จรูปเป็นรายแรก
    ยอดขายอันดับ1
    สิ่งศักดิ์สิทธิ์เป็นที่พึ่งทางใจของทุกคน
    กำแพงเมื่อจีนถือว่าเป็นสิ่งมหัศจรรย์ของโลก`.split("\n");
    
//     this.scripts = `sin khar khong rao pen un dub nueng nai loak
// computer khong rao sood yord marg
// printer tua ni wang khai pen un dub raeg`.split("\n");

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

  render() {
    return (
      <div>
        <form>
  <label>
    Name:
    <input type="text" value={this.state.speaker} onChange={this.handleChangeSpeaker} />
  </label>
  
</form>
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          onData={this.onData}
          strokeColor="#000000"
          backgroundColor="#FF4081" />
          <div>
          <div className="status">{this.state.reading_idx+'/'+this.scripts.length}</div>
        <button onClick={this.startRecording} type="button" style={this.state.record ?  { display: 'none' }: {} } >Start</button>
        <div className='reading'>{this.state.reading_script}</div>
        <button onClick={this.stopRecording} type="button" style={this.state.record ? {} : { display: 'none' }} >Save</button>
        <button onClick={this.stopRecordingNoSave} type="button" style={this.state.record ? {} : { display: 'none' }} >Retry</button>
        </div>
        
      </div>
    );
  }
}