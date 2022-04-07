let Textbox = document.getElementById('Input_Text');
const Add_btn = document.getElementById('Add_Button');
const Saved_list = document.getElementById('Saved_List');
let List = [];
let btn_index = "";

Add_btn.addEventListener('click', add_List);

// 함수 하나에 기능하나만! > 10줄이 넘어가지 말 것

// event.target > 이벤트가 발생한 tag의 정보를 가져옴
// event.keycode > 예시) keycode == 13 > Enter가 keycode 13임 

//할 일 추가
function add_List() {
    //입력된 Text가 없을 경우 alert창 표출
    if(!Textbox.value) {
        alert('할 일을 입력해주세요!');
    }

    //입력된 Text가 있을 경우 아래쪽 List에 추가
    else {
        //List 변수에 Text 값 추가
        List.push(Textbox.value);

        
        //신규 <li></li>을 생성
        const li = document.createElement('li');
        li.setAttribute('class', List.length);
        //문구가 들어갈 span 생성
        const Div = document.createElement('div');
        //List 삭제 버튼을 추가
        const Delete_btn = document.createElement('button');
        //button에 class 및 id(index 값) 추가
        Delete_btn.setAttribute('class', 'Delete_Button');
        Delete_btn.setAttribute('class', List.length);
        

        //span에 Text 및 Button Text 추가
        Div.innerText = Textbox.value;
        Delete_btn.innerText = "x";

        //li에 문구와 button을 함께 입력
        li.appendChild(Div);
        li.appendChild(Delete_btn);
        //li를 To_Do_List.html의 ul 아래에 추가
        Saved_list.appendChild(li);
        
        //할 일 지우기
        Delete_btn.addEventListener('click', function() {
            Saved_list.removeChild(li)
        });

        //완료한 할 일 취소선 긋기
        Div.addEventListener('dblclick', function() {
            Div.style.textDecoration = 'line-through';
        });

    }
    Input_Text.value = "";
    Saved_list;
}


// li 하위에 div를 사용하는 것을 추천하지 않음

