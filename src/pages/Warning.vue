<template>
    <div class="warning">
        <p>
            <b>
                WARNING!
                THIS IS A FORD MOTOR COMPANY PRIVATE COMPUTER SYSTEM. USAGE MAY BE MONITORED. UNAUTHORIZED ACCESS OR
                USE MAY RESULT IN CRIMINAL OR CIVIL PROSECUTION, DISCIPLINE UP TO AND INCLUDING TERMINATION OF
                EMPLOYMENT, TERMINATION OF ASSIGNMENT, OR LOSS OF ACCESS.
            </b>
        </p>
        <p>
            By signing on to the system I agree that, where consistent with applicable law:
        </p>
        <p>
            1) I understand and will comply with the provisions of Ford Directive B-109, and the other confidentiality
            policies listed below, 2) I do not have any expectation of privacy in my use of the system, and 3) Ford
            actively monitors its information, systems, and data to identify and respond to security threats and
            losses, and any information or data identified through this monitoring may be shared among Ford and Ford’s
            global affiliates and service providers, through approved processes or where legally required, and provided
            to government authorities (including law enforcement).
        </p>
        <p>
            Ford recognizes that in certain jurisdictions there are specific laws, regulations, and labor agreements
            that may apply, and Ford will comply with such requirements. By accessing this system, I acknowledge that
            it contains information that is Confidential and Proprietary to Ford, its affiliates, dealers, and
            suppliers, and that I am responsible for maintaining the security and confidentiality of the information
            and shall use it only for purposes authorized by Ford. Such information shall not be disclosed or caused to
            be disclosed without proper authorization from Ford.
        </p>
        <p>
            Ford owns all rights to unpublished work created by or developed for Ford and reserves the right to protect
            these works as unpublished copyrighted works in the event of an inadvertent or deliberate unauthorized
            publication. Ford also reserves its rights under the copyright laws to protect these works as published
            works. I agree to read and follow Ford Policy Letter No. 22, Directives B-109 and C-110, and Global
            Information Standard 2 (GIS2) before accessing information on the web. Click here to read these
            confidentiality policies PL 22, B-109, C-110, GIS2.
        </p>
        <br>
        <p>
            <b>
                ПРЕДУПРЕЖДЕНИЕ!
                ЭТО ЧАСТНАЯ КОМПЬЮТЕРНАЯ СИСТЕМА КОМПАНИИ FORD MOTOR COMPANY. ЗА ЕЕ ПОЛЬЗОВАНИЕМ ВЕДЕТСЯ НАБЛЮДЕНИЕ.
                НЕСАНКЦИОНИРОВАННЫЙ ДОСТУП МОЖЕТ ПРИВЕСТИ К УГОЛОВНОЙ ИЛИ ГРАЖДАНСКОЙ ОТВЕТСТЕННОСТИ, ПРИМЕНЕНИЮ
                ДИСЦИПЛИНАРНЫХ МЕР ВПЛОТЬ ДО И ВКЛЮЧАЯ УВОЛЬНЕНИЕ, РАСТОРЖЕНИЕ ДОГОВОРА ИЛИ ЗАПРЕТ К ДОСТУПУ СИСТЕМЫ.
            </b>
        </p>
        <p>
            Регистрируясь в этой системе, я соглашаюсь, что, когда это предусмотрено соответствующим законодательством:
        </p>
        <p>
            1) я понимаю и буду соблюдать положения Директивы В-109 компании Ford и другие перечисленные ниже правила
            политики конфиденциальности; 2) пользуясь этой системой, я отказываюсь от конфиденциальности; 3) компания
            Ford ведет активный мониторинг своей информации, систем и данных с целью идентификации и принятия мер по
            защите от угрозы безопасности и потери данных, и любая информация или данные, идентифицированные в таком
            мониторинге, могут совместно использоваться компанией Ford, ее глобальными аффилированными компаниями и
            провайдерами сервиса, используя одобренные процессы или там, где требуется законодательством, и
            предоставляться органам власти (включая правоохранительные органы).
        </p>
        <p>
            Компания Ford принимает во внимание, что в определенных юрисдикциях существуют специфические законы,
            постановления и трудовые соглашения и компания Ford обязуется их соблюдать. Входя в эту систему, я
            подтверждаю, что она является конфиденциальной и проприетарной для компании Ford, ее
            аффилированных компаний, дилеров и поставщиков, что я отвечаю за поддержание безопасности и
            конфиденциальности информации и что я буду использовать ее только для целей, разрешенных компанией Ford.
            Эта информация не должна разглашаться и не подлежит разглашению без надлежащего разрешения, данного
            компанией Ford.Компания Ford владеет всеми правами на неопубликованные работы, созданныe компанией Ford или
            разработанныe для нее, и сохраняет за собой право в случае их непреднамеренного или преднамеренного
            несанкционированного опубликования защищать свои авторские права на эти работы.
        </p>
        <p>
            Компания Ford также сохраняет за собой права согласно законодательству об авторском праве защищать такие
            работы как опубликованные работы. Я соглашаюсь прочитать и соблюдать Политику №22, Директивы В-109 и С-110
            и Глобальный информационный Стандарт 2 [Global Information Standard 2 (GIS2)] компании Ford, прежде чем
            получить доступ к информации в Интернете. Перейдите на Официальную Страницу Доступа к Юридическим
            Документам Компании Форд для ознакомления с положениями о конфиденциальности изложенными в PL 22, B-109,
            C-110, GIS2.
        </p>
        <router-link
            to="/log-in"
            tag="button"
            class="btn btn-primary mt-3 mb-3"
        >
            Принять
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'Warning',
};
</script>

<style scoped>
.warning {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-height: calc(100vh - 56px);
    padding: 1.1rem;
    background: white;
    z-index: 1000;
}
</style>
