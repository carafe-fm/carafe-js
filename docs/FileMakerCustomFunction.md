
# FileMaker Custom Function

```
/**
 * @SIGNATURE:
 * _carafeTemplateMerge ( implementationName; jsonData ; implementationSemanticVersion )
 *
 * @PARAMETERS:
 * implementationName - Required. Must be a valid Carafe implementation name.
 * jsonData - Required. Must be valid JSON. The JSON passed in here will be available to JavaScript from `Carafe.getData()`.
 * implementationSemanticVersion - Optional. May be an empty string or a valid semantic version. Leaving it empty will return the package from the newest implementation version available in the local environment.
 *
 * @HISTORY:
 * Created: 2018-Aug-01 by Jeremiah Small
 * Modified: 2018-Aug-28 by Jeremiah Small
 * Modified: 2018-Sep-11 by Jeremiah Small
 *
 * @PURPOSE:
 * This function merges together a Carafe package and JSON data in a specific implementation.
 *
 * @RESULT:
 * A successful result will be a valid HTML document with all the dependencies and data included in it.
 *
 * @ERRORS:
 * This function returns an error message as an HTML document if the requested implementationName and implementationSemanticVersion do not exist.
 *
 * @NOTES:
 * The Carafe project is on GitHub: https://github.com/soliantconsulting/carafe
 */


Let ( [
  // Lookup specified or latest ImplementationUniqueVersion if one exists
  ImplementationUniqueVersion = If ( IsEmpty ( implementationSemanticVersion ) ;
    ExecuteSQL("SELECT ImplementationUniqueVersion FROM CarafeImplementation CI WHERE CI.ImplementationName = ?
      ORDER BY CI.ImplementationSemanticVersionMajor DESC, CI.ImplementationSemanticVersionMinor DESC, CI.ImplementationSemanticVersionPatch DESC
        FETCH FIRST 1 ROW ONLY"; ""; ""; implementationName);
    ExecuteSQL("SELECT ImplementationUniqueVersion FROM CarafeImplementation CI WHERE CI.ImplementationName = ? AND CI.ImplementationSemanticVersion = ?";
        ""; ""; implementationName ; implementationSemanticVersion)
  );

  implementationExists = not IsEmpty ( ImplementationUniqueVersion );

  // Lookup packageName with the ImplementationUniqueVersion
  packageName = If ( implementationExists;
    ExecuteSQL("SELECT CarafePackageName FROM CarafeImplementation CI WHERE CI.ImplementationUniqueVersion = ?"; ""; ""; ImplementationUniqueVersion);
    "" // Implementation missing
  );

  // Lookup packageTag with the ImplementationUniqueVersion
  packageTag = If ( implementationExists;
    ExecuteSQL("SELECT CarafePackageTag FROM CarafeImplementation CI WHERE CI.ImplementationUniqueVersion = ?"; ""; ""; ImplementationUniqueVersion);
    "" // Implementation missing
  );

  // Prepare base package SQL statement snippet that we use more than once
  carafePackageFromSqlSnippet = " FROM CarafePackage CP WHERE CP.CarafePackageName = ? AND CP.CarafePackageTag = ?";

  // Lookup the resources
  builtLibraryCss = If ( implementationExists;
    ExecuteSQL("SELECT CarafePackageBuiltCss" & carafePackageFromSqlSnippet; ""; ""; packageName ; packageTag);
    "" // Implementation missing
  );
  builtLibraryJavaScript = If ( implementationExists;
    ExecuteSQL("SELECT CarafePackageBuiltJavaScript" & carafePackageFromSqlSnippet; ""; ""; packageName ; packageTag);
    "" // Implementation missing
  );

  htmlTemplateImplementation = If ( implementationExists;
    ExecuteSQL("SELECT ImplementationHtml FROM CarafeImplementation CI WHERE CI.ImplementationUniqueVersion = ?"; ""; ""; ImplementationUniqueVersion);
    "<!doctype html><html><body>Implementation Name <i>" & implementationName & "</i> Implementation Semantic Version <i>" & implementationSemanticVersion & "</i> is missing</body></html>" // Implementation missing
  );

  // Define the text boundaries
  startTag = "<!-- carafeZoneStart -->" ;
  endTag = "<!-- carafeZoneEnd  -->" ;
  endTagLength = Length ( endTag ) ;
  startPos = Position ( htmlTemplateImplementation ; startTag ; 0 ; 1 ) ;
  endPos = Position ( htmlTemplateImplementation ; endTag ; 0 ; 1 );
  styleTagLibrary = "<style>" & builtLibraryCss & "</style>¶";
  scriptTagLibraryContent = "<script type=\"text/javascript\">" & builtLibraryJavaScript & "</script>¶";
  scriptTagData = "<script type=\"text/javascript\">Carafe.setData(" & jsonData & "); Carafe.setIsFileMakerWebViewer();</script>¶";
  headTags = styleTagLibrary & scriptTagLibraryContent & scriptTagData
];

  // Output the result
  If ( startPos and endPos ;
    Replace ( htmlTemplateImplementation ; startPos ; ( endPos - startPos ) + endTagLength ; headTags) ;
    htmlTemplateImplementation
  )
)

```
