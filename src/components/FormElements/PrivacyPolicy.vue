<template>
  <div id="customModal">
    <div class="header">
      <h2 class="title">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</h2>
    </div>
    <div class="body">
      <p class="para">Настоящая Политика конфиденциальности персональных данных (далее – Политика конфиденциальности)
        действует в отношении всей информации, которую сайт <a href="http://localhost:8080/">НАЗВАНИЕ САЙТА</a>,
        на котором размещен
        текст этой Политики конфиденциальности, может получить о Пользователе, а также любых программ и продуктов,
        размещенных на указанном сайте. Настоящая политика конфиденциальности составлена в соответствии с требованиями
        Федерального закона от 27.07.2006 года №152-ФЗ «О персональных данных» и определяет порядок получения и обработки
        персональных данных, а также меры по обеспечению безопасности персональных данных Пользователей
        <a href="http://localhost:8080/">НАЗВАНИЕ САЙТА</a>.
      </p>
      <h3 class="subtitle">1. ОПРЕДЕЛЕНИЕ ТЕРМИНОВ</h3>
      <p class="para">1.1 В настоящей Политике конфиденциальности используются следующие термины:</p>
      <ul class="list">
        <li
          v-for="item, i in terms"
          :key="i"
          class="item"
          v-html="item"
        >
        </li>
      </ul>
      <h3 class="subtitle"> 2. ОБЩИЕ ПОЛОЖЕНИЯ</h3>
      <ul class="list">
        <li
          v-for="item, i in common"
          :key="i"
          class="item"
          v-html="item"
        >
        </li>
      </ul>
      <h3 class="subtitle">3. ПРИНЦИПЫ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ</h3>
      <p class="para">Обработка персональных данных у Оператора осуществляется на основе следующих принципов:</p>
      <ul class="list">
        <li
          v-for="item, i in personalDataHanle"
          :key="i"
          class="item"
          v-html="item"
        >

        </li>
      </ul>
      <h3 class="subtitle">4. УСЛОВИЯ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ</h3>
      <p class="para">1. Оператор производит обработку персональных данных при наличии хотя бы одного из следующих условий:</p>
      <ul class="list">
        <li
          v-for="item, i in personalDataCondition"
          :key="i"
          class="item"
          v-html="item"
        >

        </li>

      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      terms: [
        '1.1.1. «Администрация сайта» – уполномоченные сотрудники на управления сайтом <a style="text-decoration: underline; color:rgb(73, 73, 243)" href="http://localhost:8080/">НАЗВАНИЕ САЙТА</a>, действующие от его имени, которые организуют и (или) осуществляют обработку персональных данных, а также определяют цели обработки персональных данных, состав персональных данных, подлежащих обработке, действия (операции), совершаемые с персональными данными.',
        '1.1.2. «Персональные данные» - любая информация, относящаяся к прямо или косвенно определенному или определяемому физическому лицу (субъекту персональных данных).',
        '1.1.3. «Обработка персональных данных» - любое действие (операция) или совокупность действий (операций), совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных.',
        '1.1.4. «Конфиденциальность персональных данных» - обязательное для соблюдения Администрацией сайта требование не допускать их умышленного распространения без согласия субъекта персональных данных или наличия иного законного основания.',
        '1.1.5. «Пользователь сайта (далее Пользователь)» – лицо, имеющее доступ к сайту <a style="text-decoration: underline; color:rgb(73, 73, 243)" href="http://localhost:8080/">НАЗВАНИЕ САЙТА</a>, посредством сети Интернет и использующее данный сайт для своих целей.',
        '1.1.6. «Cookies» — небольшой фрагмент данных, отправленный веб-сервером и хранимый на компьютере пользователя, который веб-клиент или веб-браузер каждый раз пересылает веб-серверу в HTTP-запросе при попытке открыть страницу соответствующего сайта.',
        '1.1.7. «IP-адрес» — уникальный сетевой адрес узла в компьютерной сети, построенной по протоколу IP.'
      ],
      common: [
        '2.1. Использование Пользователем сайта <a style="text-decoration: underline; color:rgb(73, 73, 243)" href="http://localhost:8080/">НАЗВАНИЕ САЙТА</a> означает согласие с настоящей Политикой конфиденциальности и условиями обработки персональных данных Пользователя. Пользователь даёт своё согласие на обработку его персональных данных, действуя свободно, своей волей и в своём интересе. Согласие Пользователя на обработку его персональных данных является конкретным, информированным и сознательным.',
        '2.2. В случае несогласия с условиями Политики конфиденциальности Пользователь должен прекратить использование сайта.',
        '2.3. Настоящая Политика конфиденциальности применяется только к данному сайту. Администрация сайта не контролирует и не несет ответственность за сайты третьих лиц, на которые Пользователь может перейти по ссылкам, доступным на данном сайте.',
        '2.4. Администрация сайта не проверяет достоверность персональных данных, предоставляемых Пользователем сайта.',
        '2.5. Владельцем сайта <a style="text-decoration: underline; color:rgb(73, 73, 243)" href="http://localhost:8080/">НАЗВАНИЕ САЙТА</a> является Общество с ограниченной ответственностью «КМ медиа» (ОГРН 1157746400008, ИНН 7726338307, юридический адрес: 111250, г. Москва, ул. Лефортовский вал, дом 24, подвал, пом. IV, ком. 1, оф. 91).'
      ],
      personalDataHanle: [
        '3.1. законности и справедливой основы;',
        '3.2. ограничения обработки персональных данных достижением конкретных, заранее определенных и законных целей;',
        '3.3. недопущения обработки персональных данных, несовместимой с целями сбора персональных данных;',
        '3.4. недопущения объединения баз данных, содержащих персональные данные, обработка которых осуществляется в целях, несовместимых между собой;',
        '3.5. обработки только тех персональных данных, которые отвечают целям их обработки;',
        '3.6. соответствия содержания и объема обрабатываемых персональных данных заявленным целям обработки;',
        '3.7. недопущения обработки персональных данных, избыточных по отношению к заявленным целям их обработки;',
        '3.8. обеспечения точности, достаточности и актуальности персональных данных по тношению к целям обработки персональных данных;',
        '3.9. уничтожения либо обезличивания персональных данных по достижении целей их обработки или в случае утраты необходимости в достижении этих целей, при невозможности устранения Оператором допущенных нарушений персональных данных, если иное не предусмотрено федеральным законом'
      ],
      personalDataCondition: [
        '1.1. обработка персональных данных осуществляется с согласия субъекта персональных данных на обработку его персональных данных;',
        '1.2. обработка персональных данных необходима для достижения целей, предусмотренных международным договором Российской Федерации или законом, для осуществления и выполнения возложенных законодательством Российской Федерации на оператора функций, полномочий и обязанностей;',
        '1.3. обработка персональных данных необходима для осуществления правосудия, исполнения судебного акта, акта другого органа или должностного лица, подлежащих исполнению в соответствии с законодательством Российской Федерации об исполнительном производстве;',
        '1.4. обработка персональных данных необходима для исполнения договора, стороной которого либо выгодоприобретателем или поручителем по которому является субъект персональных данных, а также для заключения договора по инициативе субъекта персональных данных или договора, по которому субъект персональных данных будет являться выгодоприобретателем или поручителем;',
        '1.5. обработка персональных данных необходима для осуществления прав и законных интересов оператора или третьих лиц либо для достижения общественно значимых целей при условии, что при этом не нарушаются права и свободы субъекта персональных данных;',
        '1.6. осуществляется обработка персональных данных, доступ неограниченного круга лиц к которым предоставлен субъектом персональных данных либо по его просьбе (далее - общедоступные персональные данные);',
        '1.7. осуществляется обработка персональных данных, подлежащих опубликованию или обязательному раскрытию в соответствии с федеральным законом.'
      ]
    }
  },
  method: {
    closeModal() {
      this.$modal.hide('example')
    }
  }
}
</script>

<style scoped>
#customModal {
  font-family: 'Open Sans', Arial, sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
}

#customModal .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
}
#customModal a {
  color: rgb(73, 73, 243);
  font: inherit;
  text-decoration: underline;
}

#customModal .list {
  margin-bottom: 15px;
}

#customModal .item {
  margin-bottom: 8px;
  margin-left: 10px;
}

#customModal .subtitle {
  font-weight: bold;
  margin-bottom: 8px;
}

#customModal .para {
  margin-bottom: 8px;
}

#customModal .title {
  font-weight: bold;
}
</style>
