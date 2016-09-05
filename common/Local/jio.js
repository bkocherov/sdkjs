"use strict";

AscCommon.baseEditorsApi.prototype.jio_open = function () {
  var t = this;
  Common.Gateway.jio_get(t.documentId)
    .push(function (doc) {
      if (!doc.data) {
        switch (doc.portal_type) {
          case "Presentation":
            doc.data = t.getEmpty();
            break;
          case "Spreadsheet":
            doc.data = "XLSY;v2;2286;BAKAAgAAA+cHAAAEAwgAAADqCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGMFAAAAEQAAAAEMAAAABwEAAAAACAEAAAAABAoAAAAFAAAAAAUAAAAABnwAAAAHGgAAAAQGCgAAAEEAcgBpAGEAbAAGBQAAAAAAACRABxoAAAAEBgoAAABBAHIAaQBhAGwABgUAAAAAAAAkQAcaAAAABAYKAAAAQQByAGkAYQBsAAYFAAAAAAAAJEAHGgAAAAQGCgAAAEEAcgBpAGEAbAAGBQAAAAAAACRACB8AAAAJGgAAAAAGDgAAAEcARQBOAEUAUgBBAEwAAQSkAAAADhYDAAADPwAAAAABAQEBAQMBAQYEAAAAAAcEAAAAAAgEAAAAAAkEpAAAAA0GGAAAAAABBAEEAAAAAAUBAAYEAAAAAAcBAAgBAAMhAAAAAAEAAQEAAwEBBgQAAAAABwQAAAAACAQBAAAACQQAAAAAAyEAAAAAAQABAQADAQEGBAAAAAAHBAAAAAAIBAEAAAAJBAAAAAADIQAAAAABAAEBAAMBAQYEAAAAAAcEAAAAAAgEAgAAAAkEAAAAAAMhAAAAAAEAAQEAAwEBBgQAAAAABwQAAAAACAQCAAAACQQAAAAAAyEAAAAAAQABAQADAQEGBAAAAAAHBAAAAAAIBAAAAAAJBAAAAAADIQAAAAABAAEBAAMBAQYEAAAAAAcEAAAAAAgEAAAAAAkEAAAAAAMhAAAAAAEAAQEAAwEBBgQAAAAABwQAAAAACAQAAAAACQQAAAAAAyEAAAAAAQABAQADAQEGBAAAAAAHBAAAAAAIBAAAAAAJBAAAAAADIQAAAAABAAEBAAMBAQYEAAAAAAcEAAAAAAgEAAAAAAkEAAAAAAMhAAAAAAEAAQEAAwEBBgQAAAAABwQAAAAACAQAAAAACQQAAAAAAyEAAAAAAQABAQADAQEGBAAAAAAHBAAAAAAIBAAAAAAJBAAAAAADIQAAAAABAAEBAAMBAQYEAAAAAAcEAAAAAAgEAAAAAAkEAAAAAAMhAAAAAAEAAQEAAwEBBgQAAAAABwQAAAAACAQAAAAACQQAAAAAAyEAAAAAAQABAQADAQEGBAAAAAAHBAAAAAAIBAAAAAAJBAAAAAADIQAAAAABAAEBAAMBAQYEAAAAAAcEAAAAAAgEAQAAAAkEKwAAAAMhAAAAAAEAAQEAAwEBBgQAAAAABwQAAAAACAQBAAAACQQpAAAAAyEAAAAAAQABAQADAQEGBAAAAAAHBAAAAAAIBAEAAAAJBCwAAAADIQAAAAABAAEBAAMBAQYEAAAAAAcEAAAAAAgEAQAAAAkEKgAAAAMhAAAAAAEAAQEAAwEBBgQAAAAABwQAAAAACAQBAAAACQQJAAAAAkoAAAADRQAAAAABAAEBAAMBAAYEAAAAAAcEAAAAAAgEAAAAAAkEpAAAAAwEAAAAAA0GGAAAAAABBAEEAAAAAAUBAAYEAAAAAAcBAAgBAA8qAQAAECkAAAAABAAAAAAAAAABAQAAAAAEDAAAAE4AbwByAG0AYQBsAAUEAAAAAAAAABAnAAAAAAQAAAADAAAAAQEAAAAABAoAAABDAG8AbQBtAGEABQQAAAAPAAAAEC8AAAAABAAAAAYAAAABAQAAAAAEEgAAAEMAbwBtAG0AYQAgAFsAMABdAAUEAAAAEAAAABAtAAAAAAQAAAAEAAAAAQEAAAAABBAAAABDAHUAcgByAGUAbgBjAHkABQQAAAARAAAAEDUAAAAABAAAAAcAAAABAQAAAAAEGAAAAEMAdQByAHIAZQBuAGMAeQAgAFsAMABdAAUEAAAAEgAAABArAAAAAAQAAAAFAAAAAQEAAAAABA4AAABQAGUAcgBjAGUAbgB0AAUEAAAAEwAAABgAAAAAAwAAAAEBAAELAAAAAgYAAAAABAAAAADjAAAAAN4AAAABGwAAAAAGDAAAAFMAaABlAGUAdAAxAAEEAQAAAAIBAgIkAAAAAx8AAAABAQACBAEEAAADBAEAAAAEBAAAAAAFBXnalahdiStABAQAAABBADEAFhEAAAAXDAAAAAQBAAAAAQYBAAAAAQsKAAAAAQWamZmZmZkpQA48AAAAAAVxPQrXowA0QAEFKFyPwvUIOkACBXE9CtejADRAAwUoXI/C9Qg6QAQFcT0K16MANEAFBXE9CtejADRADwYAAAAAAQEBAQkQBgAAAAABAQEBAAkAAAAAGAYAAAACAQAAAAAAAAAA";
            break;
          case "Text":
            doc.data = "DOCY;v4;8985;BQCAAgAACYYCAAAFvAIAAAbYDwAABzMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAAADIAAAAAJAAAAAABAAEBAQIBAgMBAwQBBAUBBQYBCgcBCwgBCAkBCQoBBgsBBwEEAAAAQQ4TABgNAAAAGwAAAAkGFQAAAAoFOMEBAAsBAQwFAAAAAA0FCWIFAAFMAAAABAYKAAAAQQByAGkAYQBsAAUGCgAAAEEAcgBpAGEAbAAGBgoAAABBAHIAaQBhAGwABwYKAAAAQQByAGkAYQBsAAgEFgAAABYEFgAAAAKiDAAAACoAAAABAgAAAGEAAgwAAABOAG8AcgBtAGEAbAAJAQAAAAMIAQAAAAEKAQAAAAEAugAAAAECAAAAMQACEgAAAGgAZQBhAGQAaQBuAGcA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";
            break;
        }
      }
      t._OfflineAppDocumentEndLoad('', doc.data);
    })
    .push(undefined, function (error) {
      console.log(error);
    });
};

AscCommon.baseEditorsApi.prototype.jio_save = function () {
  var t = this,
    g = Common.Gateway,
    result = {},
    data = t.asc_nativeGetFile();
  if (g.props.save_defer) {
    // if we are run from getContent
    result[g.props.key] = data;
    g.props.save_defer.resolve(result);
    g.props.save_defer = null;
  } else {
    // TODO: rewrite to put_attachment
    return g.jio_get(t.documentId)
      .push(function (doc) {
        doc.data = data;
        return g.jio_put(t.documentId, doc)
      })
      .push(undefined, function (error) {
        console.log(error);
      });
  }
};

AscCommon.loadSdk = function (sdkName, callback) {
  var queue,
    list_files;
  function loadScript(src) {
    return new RSVP.Promise(function (resolve, reject) {
      var s;
      s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  if (window['AscNotLoadAllScript']) {
    callback();
  } else {
    queue = new RSVP.Queue();

    switch (sdkName) {
      case 'word':
        list_files = [
          "../common/downloaderfiles.js",
          "../common/NumFormat.js",
          "../common/SerializeChart.js",

          "../common/FontsFreeType/font_engine.js",
          "../common/FontsFreeType/FontFile.js",
          "../common/FontsFreeType/font_map.js",
          "../common/FontsFreeType/FontManager.js",
          "../word/Editor/FontClassification.js",

          "../common/Drawings/Metafile.js",
          "../common/FontsFreeType/TextMeasurer.js",
          "../common/Drawings/WorkEvents.js",

          "../word/Editor/History.js",

          "../common/Shapes/EditorSettings.js",
          "../common/Shapes/Serialize.js",
          "../common/Shapes/SerializeWriter.js",

          "../common/Drawings/Hit.js",
          "../common/Drawings/ArcTo.js",
          "../common/Drawings/ColorArray.js",

          "../common/Drawings/CommonController.js",
          "../word/Editor/GraphicObjects/DrawingStates.js",
          "../common/Drawings/DrawingsChanges.js",
          "../common/Drawings/Format/CreateGeometry.js",
          "../common/Drawings/Format/Geometry.js",
          "../common/Drawings/Format/Format.js",
          "../common/Drawings/Format/GraphicObjectBase.js",
          "../common/Drawings/Format/Shape.js",
          "../common/Drawings/Format/Path.js",
          "../common/Drawings/Format/Image.js",
          "../common/Drawings/Format/GroupShape.js",
          "../common/Drawings/Format/ChartSpace.js",
          "../common/Drawings/Format/ChartFormat.js",
          "../common/Drawings/Format/TextBody.js",
          "../common/Drawings/Format/GraphicFrame.js",
          "../common/Charts/charts.js",
          "../common/Charts/DrawingArea.js",
          "../common/Charts/DrawingObjects.js",
          "../common/Charts/3DTransformation.js",
          "../common/Charts/ChartsDrawer.js",
          "../common/Drawings/TrackObjects/AdjustmentTracks.js",
          "../common/Drawings/TrackObjects/MoveTracks.js",
          "../common/Drawings/TrackObjects/NewShapeTracks.js",
          "../common/Drawings/TrackObjects/PolyLine.js",
          "../common/Drawings/TrackObjects/ResizeTracks.js",
          "../common/Drawings/TrackObjects/RotateTracks.js",
          "../common/Drawings/TrackObjects/Spline.js",
          "../common/Drawings/DrawingObjectsHandlers.js",
          "../common/Drawings/TextDrawer.js",

          "../common/Drawings/Externals.js",
          "../common/GlobalLoaders.js",
          "../common/Controls.js",
          "../common/Overlay.js",
          "../common/Drawings/HatchPattern.js",

          "../common/scroll.js",
          "../common/Scrolls/iscroll.js",
          "../common/Scrolls/mobileTouchManagerBase.js",
          "../word/Drawing/mobileTouchManager.js",

          "../common/wordcopypaste.js",

          "../cell/utils/utils.js",
          "../cell/model/WorkbookElems.js",
          "../cell/model/Workbook.js",
          "../cell/model/Serialize.js",
          "../cell/model/CellInfo.js",

          "../word/Drawing/translations.js",
          "../word/Editor/GraphicObjects/Format/ShapePrototype.js",
          "../word/Editor/GraphicObjects/Format/ImagePrototype.js",
          "../word/Editor/GraphicObjects/Format/GroupPrototype.js",
          "../word/Editor/GraphicObjects/Format/ChartSpacePrototype.js",
          "../word/Editor/GraphicObjects/GraphicObjects.js",
          "../word/Editor/GraphicObjects/GraphicPage.js",
          "../word/Editor/GraphicObjects/WrapManager.js",
          "../word/Editor/Comments.js",
          "../word/Editor/CommentsChanges.js",
          "../word/Editor/Styles.js",
          "../word/Editor/StylesChanges.js",
          "../word/Editor/FlowObjects.js",
          "../word/Editor/ParagraphContent.js",
          "../word/Editor/ParagraphContentBase.js",
          "../word/Editor/Paragraph/ParaTextPr.js",
          "../word/Editor/Paragraph/ParaTextPrChanges.js",
          "../word/Editor/Paragraph/ParaDrawing.js",
          "../word/Editor/Paragraph/ParaDrawingChanges.js",
          "../word/Editor/Hyperlink.js",
          "../word/Editor/HyperlinkChanges.js",
          "../word/Editor/Field.js",
          "../word/Editor/FieldChanges.js",
          "../word/Editor/Run.js",
          "../word/Editor/RunChanges.js",
          "../word/Editor/Math.js",
          "../word/Editor/MathChanges.js",
          "../word/Editor/Paragraph.js",
          "../word/Editor/ParagraphChanges.js",
          "../word/Editor/Paragraph_Recalculate.js",
          "../word/Editor/Sections.js",
          "../word/Editor/SectionsChanges.js",
          "../word/Editor/Numbering.js",
          "../word/Editor/NumberingChanges.js",
          "../word/Editor/HeaderFooter.js",
          "../word/Editor/DocumentContentBase.js",
          "../word/Editor/Document.js",
          "../word/Editor/DocumentChanges.js",
          "../word/Editor/DocumentContent.js",
          "../word/Editor/DocumentContentChanges.js",
          "../word/Editor/DocumentControllerBase.js",
          "../word/Editor/LogicDocumentController.js",
          "../word/Editor/DrawingsController.js",
          "../word/Editor/HeaderFooterController.js",
          "../word/Editor/Common.js",
          "../word/Editor/Table.js",
          "../word/Editor/Table/TableChanges.js",
          "../word/Editor/Table/TableRecalculate.js",
          "../word/Editor/Table/TableDraw.js",
          "../word/Editor/Table/TableRow.js",
          "../word/Editor/Table/TableRowChanges.js",
          "../word/Editor/Table/TableCell.js",
          "../word/Editor/Table/TableCellChanges.js",
          "../word/Editor/Serialize2.js",
          "../word/Editor/Search.js",
          "../word/Editor/Spelling.js",
          "../word/Editor/Footnotes.js",
          "../word/Editor/FootnotesChanges.js",
          "../word/Editor/FootEndNote.js",

          "../word/Drawing/Graphics.js",
          "../word/Drawing/ShapeDrawer.js",

          "../word/Drawing/DrawingDocument.js",
          "../word/Drawing/GraphicsEvents.js",
          "../word/Drawing/Rulers.js",
          "../word/Drawing/HtmlPage.js",
          "../word/Drawing/documentrenderer.js",
          "../word/document/empty.js",
          "../word/Math/mathTypes.js",
          "../word/Math/mathText.js",
          "../word/Math/mathContent.js",
          "../word/Math/base.js",
          "../word/Math/fraction.js",
          "../word/Math/degree.js",
          "../word/Math/matrix.js",
          "../word/Math/limit.js",
          "../word/Math/nary.js",
          "../word/Math/radical.js",
          "../word/Math/operators.js",
          "../word/Math/accent.js",
          "../word/Math/borderBox.js",

          "../word/apiBuilder.js",

          "../common/clipboard_base.js",
          "../common/text_input.js",
          "../common/Drawings/Format/OleObject.js",
          "../common/Drawings/Format/DrawingContent.js",
          "../common/plugins.js",
          "../common/Local/common_jio.js",
          "../word/Local/api_jio.js"
        ];
        break;
      case 'cell':
        list_files = [
          "../common/downloaderfiles.js",
          "../common/NumFormat.js",
          "../common/SerializeChart.js",

          "../common/FontsFreeType/font_engine.js",
          "../common/FontsFreeType/FontFile.js",
          "../common/FontsFreeType/font_map.js",
          "../common/FontsFreeType/FontManager.js",
          "../word/Editor/FontClassification.js",

          "../common/Drawings/Metafile.js",
          "../common/FontsFreeType/TextMeasurer.js",
          "../common/Drawings/WorkEvents.js",

          "../cell/model/History.js",

          "../common/Shapes/EditorSettings.js",
          "../common/Shapes/Serialize.js",
          "../common/Shapes/SerializeWriter.js",

          "../common/Drawings/Hit.js",
          "../common/Drawings/ArcTo.js",
          "../common/Drawings/ColorArray.js",

          "../common/Drawings/CommonController.js",
          "../common/Drawings/States.js",
          "../common/Drawings/Format/CreateGeometry.js",
          "../common/Drawings/DrawingsChanges.js",
          "../common/Drawings/Format/Geometry.js",
          "../common/Drawings/Format/Format.js",
          "../common/Drawings/Format/GraphicObjectBase.js",
          "../common/Drawings/Format/Shape.js",
          "../common/Drawings/Format/Path.js",
          "../common/Drawings/Format/Image.js",
          "../common/Drawings/Format/GroupShape.js",
          "../common/Drawings/Format/ChartSpace.js",
          "../common/Drawings/Format/ChartFormat.js",
          "../common/Drawings/Format/TextBody.js",
          "../common/Drawings/Format/GraphicFrame.js",
          "../common/Charts/charts.js",
          "../common/Charts/DrawingArea.js",
          "../common/Charts/DrawingObjects.js",
          "../common/Charts/3DTransformation.js",
          "../common/Charts/ChartsDrawer.js",
          "../common/Drawings/TrackObjects/AdjustmentTracks.js",
          "../common/Drawings/TrackObjects/MoveTracks.js",
          "../common/Drawings/TrackObjects/NewShapeTracks.js",
          "../common/Drawings/TrackObjects/PolyLine.js",
          "../common/Drawings/TrackObjects/ResizeTracks.js",
          "../common/Drawings/TrackObjects/RotateTracks.js",
          "../common/Drawings/TrackObjects/Spline.js",
          "../common/Drawings/DrawingObjectsHandlers.js",
          "../common/Drawings/TextDrawer.js",

          "../common/Drawings/Externals.js",
          "../common/GlobalLoaders.js",
          "../common/CollaborativeEditingBase.js",
          "../common/Controls.js",
          "../common/Overlay.js",
          "../common/Drawings/HatchPattern.js",

          "../common/scroll.js",
          "../common/Scrolls/iscroll.js",
          "../common/Scrolls/mobileTouchManagerBase.js",

          "../common/wordcopypaste.js",

          "../cell/model/UndoRedo.js",
          "../cell/model/clipboard.js",
          "../cell/model/autofilters.js",
          "../cell/graphics/DrawingContext.js",
          "../cell/graphics/pdfprinter.js",
          "../cell/model/ConditionalFormatting.js",
          "../cell/model/FormulaObjects/parserFormula.js",
          "../cell/model/FormulaObjects/_xlfnFunctions.js",
          "../cell/model/FormulaObjects/dateandtimeFunctions.js",
          "../cell/model/FormulaObjects/engineeringFunctions.js",
          "../cell/model/FormulaObjects/cubeFunctions.js",
          "../cell/model/FormulaObjects/databaseFunctions.js",
          "../cell/model/FormulaObjects/textanddataFunctions.js",
          "../cell/model/FormulaObjects/statisticalFunctions.js",
          "../cell/model/FormulaObjects/financialFunctions.js",
          "../cell/model/FormulaObjects/mathematicFunctions.js",
          "../cell/model/FormulaObjects/lookupandreferenceFunctions.js",
          "../cell/model/FormulaObjects/informationFunctions.js",
          "../cell/model/FormulaObjects/logicalFunctions.js",
          "../cell/model/CellComment.js",
          "../cell/model/WorkbookElems.js",
          "../cell/model/Workbook.js",
          "../cell/model/Serialize.js",
          "../cell/model/CellInfo.js",
          "../cell/view/mobileTouch.js",
          "../cell/view/StringRender.js",
          "../cell/view/CellTextRender.js",
          "../cell/view/CellEditorView.js",
          "../cell/view/EventsController.js",
          "../cell/view/WorkbookView.js",
          "../cell/view/WorksheetView.js",
          "../cell/view/DrawingObjectsController.js",
          "../cell/model/DrawingObjects/Graphics.js",
          "../cell/model/DrawingObjects/ShapeDrawer.js",
          "../cell/model/DrawingObjects/DrawingDocument.js",
          "../cell/model/DrawingObjects/GlobalCounters.js",
          "../cell/model/DrawingObjects/Format/ShapePrototype.js",
          "../cell/model/DrawingObjects/Format/ImagePrototype.js",
          "../cell/model/DrawingObjects/Format/GroupPrototype.js",
          "../cell/model/DrawingObjects/Format/ChartSpacePrototype.js",

          "../word/Editor/Comments.js",
          "../word/Editor/CommentsChanges.js",
          "../word/Editor/Styles.js",
          "../word/Editor/StylesChanges.js",
          "../word/Editor/FlowObjects.js",
          "../word/Editor/ParagraphContent.js",
          "../word/Editor/ParagraphContentBase.js",
          "../word/Editor/Paragraph/ParaTextPr.js",
          "../word/Editor/Paragraph/ParaTextPrChanges.js",
          "../word/Editor/Paragraph/ParaDrawing.js",
          "../word/Editor/Paragraph/ParaDrawingChanges.js",
          "../word/Editor/Hyperlink.js",
          "../word/Editor/HyperlinkChanges.js",
          "../word/Editor/Field.js",
          "../word/Editor/FieldChanges.js",
          "../word/Editor/Run.js",
          "../word/Editor/RunChanges.js",
          "../word/Editor/Math.js",
          "../word/Editor/MathChanges.js",
          "../word/Editor/Paragraph.js",
          "../word/Editor/ParagraphChanges.js",
          "../word/Editor/Paragraph_Recalculate.js",
          "../word/Editor/Sections.js",
          "../word/Editor/SectionsChanges.js",
          "../word/Editor/Numbering.js",
          "../word/Editor/NumberingChanges.js",
          "../word/Editor/HeaderFooter.js",
          "../word/Editor/DocumentContentBase.js",
          "../word/Editor/Document.js",
          "../word/Editor/DocumentChanges.js",
          "../word/Editor/DocumentContent.js",
          "../word/Editor/DocumentContentChanges.js",
          "../word/Editor/DocumentControllerBase.js",
          "../word/Editor/LogicDocumentController.js",
          "../word/Editor/DrawingsController.js",
          "../word/Editor/HeaderFooterController.js",
          "../word/Editor/Table.js",
          "../word/Editor/Table/TableChanges.js",
          "../word/Editor/Table/TableRecalculate.js",
          "../word/Editor/Table/TableDraw.js",
          "../word/Editor/Table/TableRow.js",
          "../word/Editor/Table/TableRowChanges.js",
          "../word/Editor/Table/TableCell.js",
          "../word/Editor/Table/TableCellChanges.js",
          "../word/Editor/Serialize2.js",
          "../word/Editor/Spelling.js",
          "../word/Editor/Footnotes.js",
          "../word/Editor/FootnotesChanges.js",
          "../word/Editor/FootEndNote.js",
          "../word/Editor/GraphicObjects/WrapManager.js",
          "../word/Editor/Common.js",
          "../word/Math/mathTypes.js",
          "../word/Math/mathText.js",
          "../word/Math/mathContent.js",
          "../word/Math/base.js",
          "../word/Math/fraction.js",
          "../word/Math/degree.js",
          "../word/Math/matrix.js",
          "../word/Math/limit.js",
          "../word/Math/nary.js",
          "../word/Math/radical.js",
          "../word/Math/operators.js",
          "../word/Math/accent.js",
          "../word/Math/borderBox.js",

          "../word/apiBuilder.js",
          "../slide/apiBuilder.js",
          "../cell/apiBuilder.js",

          "../common/clipboard_base.js",
          "../common/text_input.js",
          "../common/Drawings/Format/OleObject.js",
          "../common/Drawings/Format/DrawingContent.js",
          "../common/plugins.js",
          "../common/Local/common_jio.js",
          "../cell/Local/api_jio.js"
        ];
        break;
      case 'slide':
        list_files = [
          "../common/downloaderfiles.js",
          "../common/NumFormat.js",
          "../common/SerializeChart.js",

          "../common/FontsFreeType/font_engine.js",
          "../common/FontsFreeType/FontFile.js",
          "../common/FontsFreeType/font_map.js",
          "../common/FontsFreeType/FontManager.js",
          "../word/Editor/FontClassification.js",

          "../common/Drawings/Metafile.js",
          "../common/FontsFreeType/TextMeasurer.js",
          "../common/Drawings/WorkEvents.js",

          "../word/Editor/History.js",

          "../common/Shapes/EditorSettings.js",
          "../common/Shapes/Serialize.js",
          "../common/Shapes/SerializeWriter.js",

          "../common/Drawings/Hit.js",
          "../common/Drawings/ArcTo.js",
          "../common/Drawings/ColorArray.js",

          "../common/Drawings/CommonController.js",
          "../common/Drawings/States.js",
          "../common/Drawings/Format/CreateGeometry.js",
          "../common/Drawings/DrawingsChanges.js",
          "../common/Drawings/Format/Geometry.js",
          "../common/Drawings/Format/Format.js",
          "../common/Drawings/Format/GraphicObjectBase.js",
          "../common/Drawings/Format/Shape.js",
          "../slide/Editor/Format/ShapePrototype.js",
          "../common/Drawings/Format/Path.js",
          "../common/Drawings/Format/Image.js",
          "../common/Drawings/Format/GroupShape.js",
          "../common/Drawings/Format/ChartSpace.js",
          "../common/Drawings/Format/ChartFormat.js",
          "../common/Drawings/Format/TextBody.js",
          "../slide/Editor/Format/TextBodyPrototype.js",
          "../common/Drawings/Format/GraphicFrame.js",
          "../common/Charts/charts.js",
          "../common/Charts/DrawingArea.js",
          "../common/Charts/DrawingObjects.js",
          "../common/Charts/3DTransformation.js",
          "../common/Charts/ChartsDrawer.js",
          "../common/Drawings/TrackObjects/AdjustmentTracks.js",
          "../common/Drawings/TrackObjects/MoveTracks.js",
          "../common/Drawings/TrackObjects/NewShapeTracks.js",
          "../common/Drawings/TrackObjects/PolyLine.js",
          "../common/Drawings/TrackObjects/ResizeTracks.js",
          "../common/Drawings/TrackObjects/RotateTracks.js",
          "../common/Drawings/TrackObjects/Spline.js",
          "../common/Drawings/DrawingObjectsHandlers.js",
          "../common/Drawings/TextDrawer.js",

          "../common/Drawings/Externals.js",
          "../common/GlobalLoaders.js",
          "../common/Controls.js",
          "../common/Overlay.js",
          "../common/Drawings/HatchPattern.js",

          "../common/scroll.js",
          "../common/Scrolls/iscroll.js",
          "../common/Scrolls/mobileTouchManagerBase.js",
          "../slide/Drawing/mobileTouchManager.js",

          "../common/wordcopypaste.js",

          "../slide/themes/Themes.js",

          "../cell/utils/utils.js",
          "../cell/model/WorkbookElems.js",
          "../cell/model/Workbook.js",
          "../cell/model/Serialize.js",
          "../cell/model/CellInfo.js",
          "../cell/view/DrawingObjectsController.js",

          "../slide/Drawing/ThemeLoader.js",
          "../word/Editor/Serialize2.js",
          "../word/Editor/Styles.js",
          "../slide/Editor/Format/StylesPrototype.js",
          "../word/Editor/Numbering.js",
          "../word/Drawing/GraphicsEvents.js",
          "../word/Drawing/Rulers.js",
          "../word/Editor/Table.js",
          "../word/Editor/Table/TableChanges.js",
          "../word/Editor/Table/TableRecalculate.js",
          "../word/Editor/Table/TableDraw.js",
          "../word/Editor/Table/TableRow.js",
          "../word/Editor/Table/TableRowChanges.js",
          "../word/Editor/Table/TableCell.js",
          "../word/Editor/Table/TableCellChanges.js",
          "../word/Editor/Common.js",
          "../word/Editor/Sections.js",
          "../word/Editor/SectionsChanges.js",

          "../word/Drawing/Graphics.js",
          "../word/Drawing/ShapeDrawer.js",

          "../slide/Drawing/Transitions.js",
          "../slide/Drawing/DrawingDocument.js",
          "../slide/Drawing/HtmlPage.js",
          "../slide/Editor/Format/Presentation.js",
          "../slide/Editor/DrawingObjectsController.js",
          "../slide/Editor/Format/Slide.js",
          "../slide/Editor/Format/SlideMaster.js",
          "../slide/Editor/Format/Layout.js",
          "../slide/Editor/Format/Comments.js",
          "../word/Editor/Styles.js",
          "../word/Editor/StylesChanges.js",
          "../word/Editor/Numbering.js",
          "../word/Editor/NumberingChanges.js",
          "../word/Editor/ParagraphContent.js",
          "../word/Editor/ParagraphContentBase.js",
          "../word/Editor/Paragraph/ParaTextPr.js",
          "../word/Editor/Paragraph/ParaTextPrChanges.js",
          "../word/Editor/Paragraph/ParaDrawing.js",
          "../word/Editor/Paragraph/ParaDrawingChanges.js",
          "../word/Editor/Hyperlink.js",
          "../word/Editor/HyperlinkChanges.js",
          "../word/Editor/Field.js",
          "../word/Editor/FieldChanges.js",
          "../word/Editor/Run.js",
          "../word/Editor/RunChanges.js",
          "../word/Math/mathTypes.js",
          "../word/Math/mathText.js",
          "../word/Math/mathContent.js",
          "../word/Math/base.js",
          "../word/Math/fraction.js",
          "../word/Math/degree.js",
          "../word/Math/matrix.js",
          "../word/Math/limit.js",
          "../word/Math/nary.js",
          "../word/Math/radical.js",
          "../word/Math/operators.js",
          "../word/Math/accent.js",
          "../word/Math/borderBox.js",
          "../word/Editor/FlowObjects.js",
          "../word/Editor/Paragraph.js",
          "../word/Editor/ParagraphChanges.js",
          "../word/Editor/Paragraph_Recalculate.js",
          "../word/Editor/DocumentContentBase.js",
          "../word/Editor/Document.js",
          "../word/Editor/DocumentChanges.js",
          "../word/Editor/DocumentContent.js",
          "../word/Editor/DocumentContentChanges.js",
          "../word/Editor/DocumentControllerBase.js",
          "../word/Editor/LogicDocumentController.js",
          "../word/Editor/DrawingsController.js",
          "../word/Editor/HeaderFooterController.js",
          "../word/Editor/HeaderFooter.js",
          "../word/Editor/Math.js",
          "../word/Editor/MathChanges.js",
          "../word/Editor/Spelling.js",
          "../word/Editor/Footnotes.js",
          "../word/Editor/FootnotesChanges.js",
          "../word/Editor/FootEndNote.js",
          "../word/Editor/Search.js",

          "../slide/Editor/Format/ImagePrototype.js",
          "../slide/Editor/Format/GroupPrototype.js",
          "../slide/Editor/Format/ChartSpacePrototype.js",
          "../slide/apiCommon.js",

          "../word/apiBuilder.js",
          "../slide/apiBuilder.js",
          "../common/clipboard_base.js",
          "../common/text_input.js",
          "../common/Drawings/Format/OleObject.js",
          "../common/Drawings/Format/DrawingContent.js",
          "../common/plugins.js",
          "../common/Local/common_jio.js",
          "../slide/Local/api_jio.js"
        ];
        break;
    }

    list_files.forEach(function (url) {
      url = url.replace('../', './sdkjs/');
      queue.push(function () {
        return loadScript(url);
      });
    });
    queue.push(callback);
  }
};