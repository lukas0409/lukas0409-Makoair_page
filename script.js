document.addEventListener('DOMContentLoaded', () => {
    const flightSelect = document.getElementById('flight');
    const seatingChart = document.getElementById('seating-chart');
    const statusMessage = document.getElementById('status-message');
    const passengerCountSpan = document.getElementById('passenger-count');
    const decreasePassengerBtn = document.getElementById('decrease-passenger');
    const increasePassengerBtn = document.getElementById('increase-passenger');
    let selectedSeats = [];
    let passengerCount = 1;

    // 비행편별 좌석 데이터 (복도를 포함한 배치)
    const seatData = {
        flight1: [
            ['1A', '1B', 'aisle', '1C', '1D'],
            ['2A', '2B', 'aisle', '2C', '2D'],
            ['3A', '3B', 'aisle', '3C', '3D']
        ],
        flight2: [
            ['1A', '1B', 'aisle', '1C'],
            ['2A', '2B', 'aisle', '2C'],
            ['3A', '3B', 'aisle', '3C'],
            ['4A', '4B', 'aisle', '4C']
        ],
        flight3: [
            ['1A', '1B', 'aisle'],
            ['2A', '2B', 'aisle'],
            ['3A', '3B', 'aisle'],
            ['4A', '4B', 'aisle'],
            ['5A', '5B', 'aisle']
        ]
    };

    // 좌석 생성 함수
    function generateSeats(flight) {
        seatingChart.innerHTML = ''; // 기존 좌석 초기화
        const rows = seatData[flight];
        rows.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('row');
            row.forEach(seat => {
                if (seat === 'aisle') {
                    const aisleDiv = document.createElement('div');
                    aisleDiv.classList.add('aisle'); // 복도 공간
                    rowDiv.appendChild(aisleDiv);
                } else {
                    const seatDiv = document.createElement('div');
                    seatDiv.classList.add('seat');
                    seatDiv.dataset.seat = seat;
                    seatDiv.textContent = seat;
                    rowDiv.appendChild(seatDiv);
                }
            });
            seatingChart.appendChild(rowDiv);
        });

        // 좌석 클릭 이벤트 연결
        addSeatClickEvent();
    }

    // 좌석 클릭 이벤트 함수
    function addSeatClickEvent() {
        const seats = document.querySelectorAll('.seat');

        seats.forEach(seat => {
            seat.addEventListener('click', () => {
                // 선택된 좌석 해제
                if (seat.classList.contains('selected')) {
                    seat.classList.remove('selected');
                    selectedSeats = selectedSeats.filter(s => s !== seat.dataset.seat);
                } else if (selectedSeats.length < passengerCount) {
                    // 새 좌석 선택
                    seat.classList.add('selected');
                    selectedSeats.push(seat.dataset.seat);
                }

                // 상태 메시지 업데이트
                if (selectedSeats.length > 0) {
                    statusMessage.textContent = `${selectedSeats.join(', ')} 좌석이 선택되었습니다.`;
                } else {
                    statusMessage.textContent = '좌석을 선택하세요.';
                }
            });
        });
    }

    // 예약 버튼 클릭 이벤트
    document.getElementById('reserve-btn').addEventListener('click', () => {
        if (selectedSeats.length === passengerCount) {
            statusMessage.textContent = `${selectedSeats.join(', ')} 좌석이 예약되었습니다.`;
            selectedSeats.forEach(seatNumber => {
                const seat = document.querySelector(`.seat[data-seat="${seatNumber}"]`);
                seat.classList.remove('selected');
                seat.classList.add('reserved');
                seat.style.pointerEvents = 'none'; // 예약된 좌석은 다시 클릭 불가
            });
            selectedSeats = [];
        } else {
            statusMessage.textContent = `총 ${passengerCount} 좌석을 선택해주세요.`;
        }
    });

    // 비행편 변경 시 좌석 재생성
    flightSelect.addEventListener('change', (e) => {
        generateSeats(e.target.value);
    });

    // 인원 수 변경 이벤트
    decreasePassengerBtn.addEventListener('click', () => {
        if (passengerCount > 1) {
            passengerCount--;
            passengerCountSpan.textContent = passengerCount;
            selectedSeats = []; // 인원 변경 시 선택 초기화
            generateSeats(flightSelect.value);
            statusMessage.textContent = '좌석을 선택하세요.';
        }
    });

    increasePassengerBtn.addEventListener('click', () => {
        if (passengerCount < 10) { // 최대 10명 제한
            passengerCount++;
            passengerCountSpan.textContent = passengerCount;
            selectedSeats = []; // 인원 변경 시 선택 초기화
            generateSeats(flightSelect.value);
            statusMessage.textContent = '좌석을 선택하세요.';
        }
    });

    // 초기 비행편 좌석 생성
    generateSeats(flightSelect.value);
});
