(function () {
    'use strict'

    var app = angular.module('app', []).controller('folhaCtrl', function ($scope) {

        //top
        $scope.top = [
            {
                title: 'pindureta',
                img: '/img/highlight-01.png'
            },
            {
                title: 'bolis',
                img: '/img/highlight-02.png'
            },
            {
                title: 'sapien',
                img: '/img/highlight-03.png'
            }
        ];

        //divoltis
        $scope.divoltis = [
            {
                title: 'consetis',
                text: 'Mussum Ipsum, cacilds vidis litro abertis. Cevadis im ampola pa arma uma pindureta.',
                img: '/img/divoltis_porris-01.png'
            },
            {
                title: 'aenean',
                text: 'Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.',
                img: '/img/divoltis_porris-02.png'
            },
            {
                title: 'matis',
                text: 'Suco de cevadiss deixa as pessoas mais interessantiss. Mais de im em mim mesmo.',
                img: '/img/divoltis_porris-03.png'
            },
            {
                title: 'divinis',
                text: 'Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget.',
                img: '/img/divoltis_porris-04.png'
            }
        ];

        //paisis
        $scope.paisis = [
            {
                text: 'Mussum Ipsum, cacilds vidis litro abertis. Não sou faixa preta cumpadi, sou preto inteiris, inteiris.'
            },
            {
                text: 'Copo furadis é disculpa de bebadis, arcu quam euismod magna. Sapien in monti palavris qui num significa nadis i pareci latim.'
            },
            {
                text: 'Sapien in monti palavris qui num significa nadis i pareci latim. Delegadis gente finis, bibendum egestas augue arcu ut est.'
            },
            {
                text: 'Viva Forevis aptent taciti sociosqu ad litora torquent Mé faiz elementum girarzis, nisi eros vermeio.'
            },
            {
                text: 'Suco de cevadiss deixa as pessoas mais interessantiss. in elementis mé pra quem é amistosis quis leo.'
            }
        ];

        //pirulita
        $scope.pirulita = [
            {
                title: 'nam liber',
                text: 'Casamentiss faiz malandris se pirulitá.',
                img: '/img/se_pirulita-01.png'
            },
            {
                title: 'gostis',
                text: 'Suco de cevadiss deixa as pessoas mais interessantiss.',
                img: '/img/se_pirulita-02.png'
            }
        ];

        //suco
        $scope.suco = [
            {
                title: 'interagir',
                text: 'É um leite divinis, qui tem lupuliz, matis, aguis, e fermentis.',
                img: '/img/suco_de_cevadiss-01.png'
            },
            {
                title: 'filhis',
                text: 'Mussum Ipsum, cacilds vidis litro abertis.',
                img: '/img/suco_de_cevadiss-02.png'
            }
        ];
    })
})();