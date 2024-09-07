# 1주차 미션: Vanilla-Todo

# 결과물

배포 링크 :
https://vanilla-todo-20th-lovat.vercel.app/

## 기능 구현

- Open, In Progress, Done column별로 목표를 확인할 수 있다.
- 각 Column에서 input field를 통해 새로운 목표를 추가할 수 있다.
- 목표는 X 버튼을 통해서 삭제할 수 있다.
- 목표 내에서 input field를 통해 새로운 할 일을 추가할 수 있다.
- 할 일은 삭제 버튼을 통해서 삭제할 수 있다.
- 할 일 요소의 체크박스틀 통해 할 일을 완료/해제할 수 있다.

# Key Questions

## DOM은 무엇인가요?

DOM(Document Object Model)은 HTML 또는 XML 문서의 구조를 표현하는 인터페이스로, 프로그래밍 언어가 DOM 구조에 접근할 수 있는 방법을 제공합니다.

예를 들어서, JS라는 프로그래밍 언어로 HTML 문서의 구조, 스타일, 내용을 변경할 수 있습니다.

&nbsp;

HTML 문서가 있다면, 브라우저는 HTML 문서를 읽어들이고 HTML의 각 요소(element)를 Node라는 객체로 표현합니다. `<h1>`~`<h6>` 태그는 `HTMLHeadingElement` 객체로, `<p>`는 `HTMLParagraphElement` 객체로 표현하며, 이런 `HTMLElement` 인터페이스를 통해서 HTML의 element를 수정할 수 있습니다.

## 이벤트 흐름 제어(버블링 & 캡처링)이 무엇인가요?

- **이벤트 버블링**이란, HTML 문서에서 이벤트가 발생했을 때, 하위 element에서부터 상위 element로 이벤트가 전달되는 방식입니다.
- **이벤트 캡처링**이란, HTML 문서에서 이벤트가 발생했을 때, 하위 element까지 이벤트가 전달되는 방식입니다.
- 이벤트는 캡처링 단계, 타깃 단계, 버블링 단계를 거칩니다.
  - **캡처링 단계**에서는 이벤트가 최상위 조상(window또는 document)에서부터 하위 element로 전달됩니다. 기본적으로 캡처링 단계에서는 이벤트 핸들러가 실행되지 않지만, 이벤트 핸들러에 옵션을 주어 이 단계에서 이벤트를 핸들링할 수 있습니다.
  - **타깃 단계**에서는 이벤트가 실제 타깃 요소에 전달됩니다. 이벤트가 타깃 element에 도착하면 타깃 element에 부착된 이벤트 핸들러가 동작합니다.
  - **버블링 단계**에서는 이벤트가 상위 element로 전달됩니다. `focus`, `blur` 등의 일부 이벤트는 버블링 단계를 거치지 않습니다.

## 클로저와 스코프가 무엇인가요?

- 스코프는 값과 표현식이 참조될 수 있는 컨텍스트를 의미합니다.
  - 하위 스코프에서는 상위 스코프에 접근할 수 있지만, 상위 스코프에서는 하위 스코프에 접근할 수 없습니다.
  - JS에는 3가지 종류의 스코프가 있습니다.
    - Global scope(전역 스코프)
    - Module scope(모듈 스코프)
    - Function scope(함수 스코프)
    - Block scope(블록 스코프)
- 클로저는 함수와 그 함수가 선언될 때의 lexical environment의 조합입니다. 함수가 생성될 때마다 클로저도 생성되며, 함수는 클로저를 통해 자신이 선언된 시점의 lexical environment(변수나 함수들)을 참조할 수 있습니다.

## 참고

- https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction
- https://ko.javascript.info/bubbling-and-capturing
- https://developer.mozilla.org/en-US/docs/Glossary/Scope
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
