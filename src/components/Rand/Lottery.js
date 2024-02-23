import React, { useEffect, useState } from 'react'
import { Box, Modal } from '@mui/material'
import '../SASS/Lottery.scss'

const Lotter = () => {

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [modalContent, setModalContent] = useState('')

  const [rndNums, setRndNums] = useState({
    firstPrize: '',
    sidePrize1: '',
    sidePrize2: '',
    secondPrize1: '',
    secondPrize2: '',
    secondPrize3: '',
  })

  const [rndtwoNums, setRndtwoNums] = useState({
    lastTwoPrize: '',
  })

  const [inputNum, setInputNum] = useState('')

  useEffect(() => {
    const saveRndNums = localStorage.getItem('rndNums')
    const saveRndtwoNums = localStorage.getItem('rndtwoNums')

    if (saveRndNums) {
      setRndNums(JSON.parse(saveRndNums))
    }

    if (saveRndtwoNums) {
      setRndtwoNums(JSON.parse(saveRndtwoNums))
    }
  }, [])

  const saveToLocal = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const getRndNums = () => {
    const min = 0
    const max = 999
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const GenRndNums = () => {
    let firstPrize = getRndNums()

    let sidePrize1, sidePrize2

    //check if firstPrize is 000 sidePrize1 will 001 and sidePrize2 will 002.
    if (firstPrize === 0) {
      sidePrize1 = 999
      sidePrize2 = firstPrize + 1
    } else if (firstPrize === 999) {
      sidePrize1 = firstPrize - 1
      sidePrize2 = 0
    } else {
      sidePrize1 = firstPrize - 1
      sidePrize2 = firstPrize + 1
    }

    let secondPrize1, secondPrize2, secondPrize3

    // check for the number not duplicated.
    do {
      secondPrize1 = getRndNums()
    } while (
      secondPrize1 === firstPrize ||
      secondPrize1 === sidePrize1 ||
      secondPrize1 === sidePrize2
    )

    do {
      secondPrize2 = getRndNums()
    } while (
      secondPrize2 === firstPrize ||
      secondPrize2 === sidePrize1 ||
      secondPrize2 === sidePrize2 ||
      secondPrize2 === secondPrize1
    )

    do {
      secondPrize3 = getRndNums()
    } while (
      secondPrize3 === firstPrize ||
      secondPrize3 === sidePrize1 ||
      secondPrize3 === sidePrize2 ||
      secondPrize3 === secondPrize1 ||
      secondPrize3 === secondPrize2
    )
    // make a number have 3 digits.
    const newRndNums = {
      firstPrize: ('00' + firstPrize).slice(-3),
      sidePrize1: ('00' + sidePrize1).slice(-3),
      sidePrize2: ('00' + sidePrize2).slice(-3),
      secondPrize1: ('00' + secondPrize1).slice(-3),
      secondPrize2: ('00' + secondPrize2).slice(-3),
      secondPrize3: ('00' + secondPrize3).slice(-3),
    }

    setRndNums(newRndNums)
    saveToLocal('rndNums', newRndNums)
  }

  // make a 2 digits of rear
  const GenRndtwoNums = () => {
    const getRndtwoNums = () => Math.floor(Math.random() * 100)
    let lastTwoPrize = getRndtwoNums()

    const newRndtwoNums = {
      lastTwoPrize: ('0' + lastTwoPrize).slice(-2),
    }

    setRndtwoNums(newRndtwoNums)
    saveToLocal('rndtwoNums', newRndtwoNums)
  }

  // check Prize that you have.
  const checkPrize = () => {
    const {
      firstPrize,
      sidePrize1,
      sidePrize2,
      secondPrize1,
      secondPrize2,
      secondPrize3,
    } = rndNums

    const { lastTwoPrize } = rndtwoNums
    const numToCheck = inputNum.trim()
    const parsedNum = parseInt(numToCheck)

    if (numToCheck === '') {
      setModalContent('กรุณาใส่หมายเลขที่ท่านต้องการ')
      return
    } else if (!/^\d+$/.test(numToCheck)) {
      setModalContent('กรุณากรอกข้อมูลเป็นตัวเลข')
    } else if (numToCheck.length <= 1 || numToCheck.length > 3) {
      setModalContent('กรุณาใส่หมายเลขที่ถูกต้อง')
      return
    } else {
      switch (parsedNum) {
        case parseInt(firstPrize):
          setModalContent(
            <div className="modal_box_res">
              หมายเลข : {firstPrize} <br /> ยินดีด้วยคุณถูกรางวัลที่ 1
            </div>
          )
          break
        case parseInt(sidePrize1):
          setModalContent(
            <div className="modal_box_res">
              หมายเลข : {sidePrize1} <br />{' '}
              ยินดีด้วยคุณถูกรางวัลข้างเคียงรางวัลที่ 1
            </div>
          )
          break
        case parseInt(sidePrize2):
          setModalContent(
            <div className="modal_box_res">
              หมายเลข : {sidePrize2} <br />{' '}
              ยินดีด้วยคุณถูกรางวัลข้างเคียงรางวัลที่ 1
            </div>
          )
          break
        case parseInt(secondPrize1):
          setModalContent(
            <div className="modal_box_res">
              หมายเลข : {secondPrize1} <br /> ยินดีด้วยคุณถูกรางวัลที่ 2
            </div>
          )
          break
        case parseInt(secondPrize2):
          setModalContent(
            <div className="modal_box_res">
              หมายเลข : {secondPrize2} <br /> ยินดีด้วยคุณถูกรางวัลที่ 2
            </div>
          )
          break
        case parseInt(secondPrize3):
          setModalContent(
            <div className="modal_box_res">
              หมายเลข : {secondPrize3} <br /> ยินดีด้วยคุณถูกรางวัลที่ 2
            </div>
          )
          break
        case parseInt(lastTwoPrize):
          setModalContent(
            <div className="modal_box_res">
              หมายเลข : {lastTwoPrize} <br /> ยินดีด้วยคุณถูกรางวัลเลขท้าย 2 ตัว
            </div>
          )
          break
        default:
          setModalContent('เสียใจด้วยคุณไม่ถูกรางวัล')
      }
      handleOpen()
    }
  }

  return (
    <>
      <div className="lotter">
        <div className="lotter_con">
          <div className="lotter_Diver">
            <div className="lotter_rnd">
              <p>รางวัลล็อตเตอรี่</p>
              <p2>ผลการออกรางวัลล็อตเตอรี่</p2>
              <button
                className="rnd_btn"
                type="button"
                onClick={() => {
                  GenRndNums()
                  GenRndtwoNums()
                }}
              >
                ดำเนินการสุ่มรางวัล
              </button>
            </div>
            <div className="lotter_items">
              <div className="stprize_con">
                <div className="stword">รางวัลที่ 1</div>
                <div className="stprize">{rndNums.firstPrize}</div>
              </div>
              <div className="cstprize_con">
                <div className="cstword">รางวัลข้างเคียงรางวัลที่ 1</div>
                <div className="cstprize1">{rndNums.sidePrize1}</div>
                <div className="cstprize2">{rndNums.sidePrize2}</div>
              </div>
              <div className="ndprize_con">
                <div className="ndprizeword">รางวัลที่ 2</div>
                <div className="ndprize1">{rndNums.secondPrize1}</div>
                <div className="ndprize2">{rndNums.secondPrize2}</div>
                <div className="ndprize3">{rndNums.secondPrize3}</div>
              </div>
              <div className="twoprize_con">
                <div className="twoprizeword">รางวัลเลขท้าย 2 ตัว</div>
                <div className="twoprize">{rndtwoNums.lastTwoPrize}</div>
              </div>
            </div>
            <div className="lotter_check">
              <div className="lotter_check_con">
                <h2 className="word">ตรวจรางวัลล็อตเตอรี่</h2>
                <p>เลขล็อตเตอรี่ของท่าน</p>
                <input
                  type="text"
                  className="form_control"
                  placeholder="กรุณากรอกเลขล็อตเตอรี่"
                  value={inputNum}
                  onChange={(e) => setInputNum(e.target.value)}
                />
                <button
                  className="btn_check"
                  type="button"
                  onClick={() => {
                    checkPrize()
                    handleOpen()
                  }}
                >
                  ตรวจรางวัล
                </button>
                <Modal open={open} onClose={handleClose}>
                  <Box className="modal_box">
                    <p className="modal_box_res" sx={{ mt: 2 }}>
                      {modalContent}
                    </p>
                  </Box>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Lotter
