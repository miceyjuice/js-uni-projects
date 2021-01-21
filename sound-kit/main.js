class SoundKit {
  constructor() {
    this._recordTemplate = `Record<span class="record-dot"></span>`;
    this._stopTemplate = `Stop<span class="record-dot"></span>`;
    this._channel = [];
    this._isRecorded = false;
    this._recordButtonPressedTime = "";
    this._chosenChannel = "channel1";

    this.init();
  }

  init() {
    this._setTimeOfRecording();
    this._handleKeyPress();
    this._manipulateControlButtons();
    this._handleChannelChange();
  }

  _manipulateControlButtons() {
    const $_controlButtons = document.querySelectorAll(".ctrl-btn");
    for (let i = 0; i < $_controlButtons.length; i++) {
      $_controlButtons[i].addEventListener("click", () => {
        let btnClass = $_controlButtons[i].classList[1];
        this._handleChannel(`.${btnClass}`);
      });
    }
  }

  _handleKeyPress() {
    document.body.addEventListener("keypress", (e) => {
      this._operateSoundPlayer(e);
    });
  }

  _operateSoundPlayer(e) {
    const _sound = document.querySelector(`#${e.code} audio`);
    if (_sound) {
      this._playSound(_sound);
      console.log(this._isRecorded);
      if (this._isRecorded) {
        this._addDataToChannel(this._getCurrentSrcOfSound(_sound));
      }
    }
    this._handleColorChange(`#${e.code}`);
  }

  _handleChannel(elClassName) {
    const _$btn = document.querySelector(elClassName);
    console.log(this._getClassNameOfBtnOperationChannel(elClassName));

    if (this._getClassNameOfBtnOperationChannel(elClassName)) {
      _$btn.addEventListener("click", () => this._playChannel());
    } else {
      _$btn.addEventListener("click", () => this._removeChannel());
    }
  }

  _removeChannel() {
    this._channel.map(() =>
      this._channel.splice(
        this._channel.findIndex((v) => v.channelName === this._chosenChannel)
      )
    );
  }

  _getClassNameOfBtnOperationChannel(className) {
    className = className.split("-");
    className = className[className.length - 1];
    if (className === "play") {
      return true;
    } else {
      return false;
    }
  }

  _playChannel() {
    this._channel.map((value) => {
      if (value.channelName === this._chosenChannel) {
        const _newAudio = new Audio(`./assets/audio/${value.trackName}`);
        setTimeout(() => _newAudio.play(), value.timeStamp);
      }
    });
  }

  _handleChannelChange() {
    document
      .querySelector("#channels")
      .addEventListener(
        "change",
        () => (this._chosenChannel = document.querySelector("#channels")).value
      );
  }

  _handleColorChange(elId) {
    document.querySelector(elId).classList.add("changed");
    setTimeout(
      () => document.querySelector(elId).classList.remove("changed"),
      200
    );
  }

  _addDataToChannel(data) {
    this._channel.push({
      channelName: this._chosenChannel.toString(),
      trackName: data,
      timeStamp: Date.now() - this._recordButtonPressedTime,
    });
  }

  _getCurrentSrcOfSound(soundSrc) {
    soundSrc = soundSrc.src;
    soundSrc = soundSrc.split("/");
    soundSrc = soundSrc[soundSrc.length - 1];
    return soundSrc;
  }

  _playSound(sound) {
    sound.play();
  }

  _setTimeOfRecording() {
    const _$recordBtn = document.querySelector(".record-button");

    _$recordBtn.addEventListener("click", () => {
      this._recordButtonPressedTime = Date.now();
      this._changeButtonTemplate(_$recordBtn);
    });
  }

  _changeButtonTemplate(btnEl) {
    if (btnEl.childNodes[0].data.trim() === `Record`) {
      btnEl.innerHTML = this._stopTemplate;
      this._changeIsRecordedState();
    } else {
      btnEl.innerHTML = this._recordTemplate;
      this._changeIsRecordedState();
    }
  }

  _changeIsRecordedState() {
    this._isRecorded = !this._isRecorded;
  }
}
document.addEventListener("DOMContentLoaded", () => new SoundKit());
