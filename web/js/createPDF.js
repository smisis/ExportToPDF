/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(function () {
        
        var specialElementHandlers = {
            '#editor': function (element,renderer) {
                return true;
            }
        };
     $('#cmd').click(function () {
         
       
        var doc = new jsPDF();
        
        //doc = examples.auto();
        doc.setFont("helvetica");
        doc.setFontType("bold");
        doc.text(170, 10, 'FACTURA');
        
        
        doc.setFont("helvetica");
        doc.setFontSize(11);
        doc.setFontType("bold");
        doc.text(135, 18, 'Fecha factura:');

        doc.setFont("helvetica");
        doc.setFontType("bold");
        doc.text(135, 24, 'Numero factura:');

        doc.setFont("helvetica");
        doc.setFontSize(10);
        doc.setFontType("bold");
        doc.text(175, 36, 'CLIENTE:');
        
        doc.fromHTML($('#trRazon0').html(), 15, 13, {
                    'width': 170,'elementHandlers': specialElementHandlers
                });
        
        doc.fromHTML($('#trRazon1').html(), 15, 18, {
                    'width': 170,'elementHandlers': specialElementHandlers
                });
        doc.fromHTML($('#trRazon2').html(), 15, 23, {
                    'width': 190,'elementHandlers': specialElementHandlers
                });
        doc.fromHTML($('#trRazon3').html(), 15, 28, {
                    'width': 210,'elementHandlers': specialElementHandlers
                });
        doc.fromHTML($('#trRazon4').html(), 15, 33, {
                    'width': 230,'elementHandlers': specialElementHandlers
                });
         doc.fromHTML($('#trRazon5').html(), 15, 38, {
                    'width': 210,'elementHandlers': specialElementHandlers
                });
        doc.fromHTML($('#trRazon6').html(), 15, 43, {
                    'width': 230,'elementHandlers': specialElementHandlers
                });

        doc.fromHTML($('#trFecha').html(), 170, 11, {
                    'width': 230,'elementHandlers': specialElementHandlers
                });
        doc.fromHTML($('#trNumero').html(), 170, 17, {
                    'width': 230,'elementHandlers': specialElementHandlers
                });
         
         // 2 lineas 
        doc.setDrawColor(124,124,124); // draw red lines 
        doc.setLineWidth(0.5);
        doc.line(100, 12, 200, 12);
        doc.line(100, 26, 200, 26);
        doc.line(103, 38, 197, 38);
        
        doc.fromHTML($('#cliente1').html(), 110, 37, {
                    'width': 190,'elementHandlers': specialElementHandlers
                });
        doc.fromHTML($('#cliente2').html(), 110, 42, {
                    'width': 210,'elementHandlers': specialElementHandlers
                });
        doc.fromHTML($('#cliente3').html(), 110, 47, {
                    'width': 230,'elementHandlers': specialElementHandlers
                });

        doc.fromHTML($('#cliente4').html(), 110, 52, {
                    'width': 230,'elementHandlers': specialElementHandlers
                });
        doc.fromHTML($('#cliente5').html(), 110, 57, {
                    'width': 230,'elementHandlers': specialElementHandlers
                });
        
        /// Rectangules
        doc.setDrawColor(124,124,124);
        doc.setFillColor(248,248,246);
        doc.rect(100, 30, 100, 35);
      
        doc.setDrawColor(0);
        doc.setFillColor(179,212,255);
        doc.rect(8, 70, 190, 8, 'F'); 
        
        var table = tableToJson($('#tableconceptos').get(0))
        
        var y=75.5;
        $.each(table, function (i, row){
            var x=12;
            console.debug(row);
            $.each(row, function (j, cell){
                doc.setFont("courier");
                doc.setFontType("normal");
                doc.setFontSize(10);
                doc.text(x, y, cell);
                if(j== "concepto")
                {
                    x=x+100;
                }
                else{
               
                x=x+20;
            }
            })
            
             y= y+5;
        })
        
        var dataIva =  new Array();
        var precioIva = 0;
        var dataIRPF = new Array(); 
        var totalPrecio = 0;
        $.each(table, function (a, row){
            console.debug(row);
            $.each(row, function (k, cell){
                doc.setFont("courier");
                doc.setFontType("normal");
                doc.setFontSize(8);
                if(k=='precio' & cell!='PRECIO')
                {
                    
                    precioIva = cell.replace(",", ".");
                    totalPrecio = totalPrecio + parseFloat(precioIva);
                }
               
                if(k=='%iva' & cell!='% IVA')
                {
                        cell= cell.replace(",", ".");
                         if(dataIva[cell]!=null & dataIva[cell]!=undefined)
                            {
                                dataIva[cell]= dataIva[cell]+parseFloat(precioIva);
                                
                            }else
                        {
                            dataIva[cell]=parseFloat(precioIva);
                        }
                   
                }
                
                if(k=='%irpf' & cell!='% IRPF')
                {
                        cell= cell.replace(",", ".");
                         if(dataIRPF[cell]!=null & dataIRPF[cell]!=undefined)
                            {
                                dataIRPF[cell]= dataIRPF[cell]+parseFloat(precioIva);
                                
                            }else
                        {
                            dataIRPF[cell]=parseFloat(precioIva);
                        }
                   
                }
               
                
                
            })
            
             
        })
        doc.line(10, y+2, 200, y+2);
        
        y = y +2;
        var totalIva= 0;
        var totalIRPF = 0;
        
        
        for(var i in dataIva)
        {
      
            doc.setFont("helvetica");
            doc.setFontSize(10);
            doc.text(120, y+7, 'Base imponible al ' + i + ' de IVA');
            
            doc.setFont("helvetica");
            doc.setFontSize(10);
            doc.text(180, y+7, Number(dataIva[i].toFixed(2)).format(2) + '€');
            
            doc.setFont("helvetica");
            doc.setFontSize(10);
            doc.text(120, y+12, 'Cuota del  '  + i + ' de IVA');
            
            doc.setFont("helvetica");
            doc.setFontSize(10);
            doc.text(180, y+12, Number((parseFloat(i) * dataIva[i]).toFixed(2)).format(2) + '€');
            totalIva = totalIva + Number((parseFloat(i) * dataIva[i]).toFixed(2));
            y= y+12;
        }
        
        for(var i in dataIRPF)
        {
      
            doc.setFont("helvetica");
            doc.setFontSize(10);
            doc.text(120, y+7, 'Base imponible al ' + i + ' de retención');
            //('Example text', 120, y+7, 'right', 'middle');
            //doc.myText('Example text', 120, y+7, 'center', 'middle');
            
            doc.setFont("helvetica");
            doc.setFontSize(10);
            doc.text(180, y+7, Number(dataIRPF[i].toFixed(2)).format(2) + '€');
            
            doc.setFont("helvetica");
            doc.setFontSize(10);
            doc.text(120, y+12, 'Cuota del  '  + i + ' de retención');
            
            doc.setFont("helvetica");
            doc.setFontSize(10);
            doc.text(180, y+12, Number((parseFloat(i) * dataIRPF[i]).toFixed(2)).format(2) + '€');
            totalIRPF = totalIRPF + Number((parseFloat(i) * dataIRPF[i]).toFixed(2));
            
            y= y+12;
        }
        var total = totalPrecio + totalIva - totalIRPF;
        
        doc.setFont("helvetica");
        doc.setFontSize(10);
        doc.text(120, y+12, 'Total IVA  ');
        
        doc.setFont("helvetica");
        doc.setFontSize(10);
        doc.text(180, y+12, Number(totalIva.toFixed(2)).format(2) + '€');
        
        doc.setFont("helvetica");
        doc.setFontSize(10);
        doc.text(120, y+17, 'Total retencion  ');
        
        doc.setFont("helvetica");
        doc.setFontSize(10);
        doc.text(180, y+17, Number(totalIRPF.toFixed(2)).format(2) + '€');
        
        doc.setFont("helvetica");
        doc.setFontSize(12);
        doc.setFontType("bold");
        doc.text(120, y+42, 'Total factura  ');
        
        doc.setFont("helvetica");
        doc.setFontSize(10);
        doc.text(180, y+42, Number(total.toFixed(2)).format(2) + '€');
        doc.save();
         
     });
 });
 
 function parseString(data){
				
    if(defaults.htmlContent == 'true'){
            content_data = data.html().trim();
    }else{
            content_data = data.text().trim();
    }

    if(defaults.escape == 'true'){
            content_data = escape(content_data);
    }



    return content_data;
    }
 
 function tableToJson(table) {
    var data = [];    
    // first row needs to be headers
    var headers = [];
    for (var i = 0; i < table.rows[0].cells.length; i++) {
        headers[i] = table.rows[0].cells[i].innerText.toLowerCase().replace(/ /gi, '');
    }

    // go through cells
    for (var i = 0; i < table.rows.length; i++) {
        var tableRow = table.rows[i];
        var rowData = {};    
        for (var j = 0; j < tableRow.cells.length; j++) {
         rowData[headers[j]] = tableRow.cells[j].innerText;
         }
    data.push(rowData);
    }
  return data;
}

Number.prototype.format = function(n, x) {
    var re = '(\\d)(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$1,');
};

(function(API){
    var splitRegex = /\r\n|\r|\n/g;
    API.myText = function (text, x, y, hAlign, vAlign) {
    var fontSize = this.internal.getFontSize() / this.internal.scaleFactor;

    // As defined in jsPDF source code
    var lineHeightProportion = 1.15;

    var splittedText = null;
    var lineCount = 1;
    if (vAlign === 'middle' || vAlign === 'bottom' || hAlign === 'center' || hAlign === 'right') {
        splittedText = typeof text === 'string' ? text.split(splitRegex) : text;

        lineCount = splittedText.length || 1;
    }

    // Align the top
    y += fontSize * (2 - lineHeightProportion);

    if (vAlign === 'middle')
        y -= (lineCount / 2) * fontSize;
    else if (vAlign === 'bottom')
        y -= lineCount * fontSize;

    if (hAlign === 'center' || hAlign === 'right') {
        var alignSize = fontSize;
        if (hAlign === 'center')
            alignSize *= 0.5;

        if (lineCount > 1) {
            for (var iLine = 0; iLine < splittedText.length; iLine++) {
                this.text(splittedText[iLine], x - this.getStringUnitWidth(splittedText[iLine]) * alignSize, y);
                y += fontSize;
            }
            return this;
        }
        x -= this.getStringUnitWidth(text) * alignSize;
    }

    this.text(text, x, y);
    return this;
};
})(jsPDF.API);


