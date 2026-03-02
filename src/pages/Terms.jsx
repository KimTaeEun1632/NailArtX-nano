import React from "react";

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 lg:py-24 prose dark:prose-invert">
      <h1 className="text-3xl font-bold mb-8">서비스 이용약관</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">최종 수정일: 2024년 3월 2일</p>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">제 1 조 (목적)</h2>
        <p>본 약관은 NailArtX(이하 "회사")가 제공하는 AI 네일 아트 디자인 생성 서비스(이하 "서비스") 및 관련 제반 서비스의 이용과 관련하여 회사와 이용자 사이의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">제 2 조 (용어의 정의)</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>"서비스"라 함은 이용자가 입력한 텍스트 또는 선택한 옵션을 바탕으로 AI 기술을 이용하여 네일 아트 디자인 이미지를 생성해주는 NailArtX 서비스를 의미합니다.</li>
          <li>"이용자"라 함은 회사의 서비스에 접속하여 본 약관에 따라 회사가 제공하는 서비스를 이용하는 회원 및 비회원을 말합니다.</li>
          <li>"콘텐츠"라 함은 서비스 이용 과정에서 생성된 이미지, 텍스트 등의 결과물을 의미합니다.</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">제 3 조 (서비스의 내용 및 변경)</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>회사는 이용자에게 AI 네일 아트 디자인 생성, 갤러리 저장, 디자인 레퍼런스 제공 등의 서비스를 제공합니다.</li>
          <li>회사는 서비스의 품질 향상 또는 기술적 사유 등에 따라 서비스의 내용을 변경할 수 있으며, 이 경우 웹사이트를 통해 사전에 공지합니다.</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">제 4 조 (지식재산권 및 저작권)</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>서비스를 통해 생성된 결과물(디자인 이미지)의 저작권 및 사용 권한은 회사와 이용자 간의 별도 유료 플랜 규정에 따릅니다.</li>
          <li>이용자는 생성된 디자인을 개인적인 용도(네일 샵 방문 시 참고용 등)로 자유롭게 사용할 수 있습니다. 단, 상업적 이용의 경우 해당 플랜의 규정을 준수해야 합니다.</li>
          <li>AI 모델의 특성상 생성된 이미지는 다른 이용자의 결과물과 유사할 수 있으며, 이에 대한 독점적인 권리를 보장하지 않습니다.</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">제 5 조 (책임의 제한)</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>회사는 AI 기술을 통해 생성된 디자인의 정확성, 현실 세계에서의 구현 가능성, 미적 만족도를 보장하지 않습니다.</li>
          <li>실제 네일 시술 결과는 시술자의 숙련도, 재료, 손톱 상태에 따라 생성된 이미지와 다를 수 있으며, 회사는 이에 대해 책임을 지지 않습니다.</li>
          <li>회사는 천재지변, 서비스 장애, 기간통신사업자의 서비스 중단 등으로 인하여 서비스를 제공할 수 없는 경우에는 책임을 면합니다.</li>
        </ol>
      </section>
      
      <p className="mt-12 text-sm text-gray-500">
        본 약관에 명시되지 않은 사항은 관계 법령 또는 상관례에 따릅니다.
      </p>
    </div>
  );
};

export default Terms;
